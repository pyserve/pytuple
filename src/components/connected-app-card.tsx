"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ConnectionType } from "@/lib";
import api from "@/lib/api";
import { formatDate } from "@/lib/date";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDialog } from "./providers/alert-dialog-provider";

export default function ConnectedAppCard({
  app,
  connections,
}: {
  app: ConnectionType;
  connections: ConnectionType[];
}) {
  const { data: session } = useSession();
  const [testing, setTesting] = useState(false);
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();

  const isConnected = connections.some(
    (conn) => conn.provider === app.provider
  );

  const connectionData = connections.find(
    (conn) => conn.provider === app.provider
  );

  const handleTestConnection = async (token: string | null) => {
    setTesting(true);
    try {
      const url =
        (app.provider === "Google Gemini"
          ? `${app.url}?key=${token ? token : connectionData?.key}`
          : app.url) ?? "/";
      const headers = {
        headers: {
          Authorization: `Bearer ${
            app.provider === "Google Gemini"
              ? ""
              : token
              ? token
              : connectionData?.key
          }`,
        },
      };
      const res = await axios.get(url, headers);
      console.log("🚀 ~ handleTestConnection ~ res:", res);
      toast.success(`${app.provider} connection successful!`);
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
    } finally {
      setTesting(false);
    }
    return false;
  };

  const handleConnect = async () => {
    setIsSubmitting(true);
    console.log("Submit token for", app.provider, token);
    try {
      if (await handleTestConnection(token)) {
        const res = await api.post("/api_credentials/", {
          key: token,
          user: session?.user?.id,
          provider: app.provider,
        });
        console.log("🚀 ~ handleConnect ~ res:", res);
        toast.success(`Token submitted for ${app.provider}`);
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["api_credential"] });
      } else {
        throw new Error("Invalid token provided!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisconnect = async () => {
    if (await showDialog({})) {
      try {
        const res = await api.delete(`/api_credentials/${connectionData?.id}/`);
        console.log("🚀 ~ handleDisconnect ~ res:", res);
        toast.success(
          `${connectionData?.provider} connection removed sucessfully!`
        );
        queryClient.invalidateQueries({ queryKey: ["api_credential"] });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error");
      }
    } else {
      toast.error("Cancelled!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-start gap-4 flex-grow">
        <Image
          src={app.logo}
          className="border rounded-full object-contain p-2 bg-white"
          height={60}
          width={60}
          alt={`${app.provider} Logo`}
        />
        <div>
          <div className="text-xl font-semibold">{app.provider}</div>
          <div className="text-sm text-gray-600 max-w-md">
            {app.description}
            {isConnected && connectionData && (
              <div className="grid grid-cols-1 gap-2 items-center py-2 text-xs">
                <div className="capitalize">
                  <span>Status:</span>
                  <span className="font-bold ms-1">
                    {connectionData?.status}
                  </span>
                </div>
                <div>
                  <span>Expires at:</span>
                  <span className="font-bold ms-1">
                    {formatDate(connectionData.expires_at)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {isConnected ? (
          <div className="flex flex-col gap-2">
            <Button
              size={"sm"}
              variant="outline"
              onClick={() => handleTestConnection(null)}
            >
              {testing ? (
                <span className="flex gap-1">
                  <Loader2 className="animate-spin" />
                  <span>Testing...</span>
                </span>
              ) : (
                "Test Connection"
              )}
            </Button>
            <Button size={"sm"} onClick={() => handleDisconnect()}>
              Disconnect
            </Button>
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size={"sm"} disabled={isConnected}>
                {isConnected ? "Connected" : "Connect"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Connect {app.provider}</DialogTitle>
                <DialogDescription>
                  Please provide the access token. Click here to know how to get
                  this token.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`token-${app.id}`} className="text-right">
                    API Token
                  </Label>
                  <Input
                    id={`token-${app.id}`}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste token here"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={token.trim() === ""}
                  type="button"
                  onClick={handleConnect}
                >
                  {IsSubmitting ? (
                    <span className="flex gap-2">
                      <Loader2 className="animate-spin" />
                      <span>Saving...</span>
                    </span>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
