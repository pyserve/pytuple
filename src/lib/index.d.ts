export type ConnectionType = {
  id: string;
  provider: string;
  description: string;
  logo: StaticImageData;
  key?: string;
  expires_at?: string;
  created_at?: string;
  status?: string;
  url?: string;
};
