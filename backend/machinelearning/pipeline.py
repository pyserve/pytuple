import os

from langchain.chains import RetrievalQA
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import HuggingFacePipeline
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline


class RAGPipeline:
    def __init__(
        self,
        hf_token: str,
        model_id: str = "meta-llama/Llama-2-7b-chat-hf",
        embedding_model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
        qdrant_host: str = "localhost",
        collection_name: str = "my_collection",
        qdrant_port: int = 6333,
        chunk_size: int = 500,
        chunk_overlap: int = 50,
        max_length: int = 512,
        temperature: float = 0.7,
        retriever_k: int = 3,
    ):
        self.hf_token = hf_token
        self.model_id = model_id
        self.embedding_model_name = embedding_model_name
        self.qdrant_host = qdrant_host
        self.qdrant_port = qdrant_port
        self.collection_name = collection_name
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.max_length = max_length
        self.temperature = temperature
        self.retriever_k = retriever_k

        self._vectorstore = None
        self._llm = None
        self._qa_chain = None

    def _init_llm(self):
        print(f"🔹 Loading LLM model: {self.model_id}")
        tokenizer = AutoTokenizer.from_pretrained(self.model_id, token=self.hf_token)
        model = AutoModelForCausalLM.from_pretrained(
            self.model_id, device_map="auto", token=self.hf_token
        )
        pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            max_length=self.max_length,
            temperature=self.temperature,
        )
        self._llm = HuggingFacePipeline(pipeline=pipe)

    def _init_vectorstore(self):
        print(f"🔹 Loading embeddings: {self.embedding_model_name}")
        try:
            embedding_model = HuggingFaceEmbeddings(
                model_name=self.embedding_model_name,
                huggingfacehub_api_token=self.hf_token,
            )
        except Exception as e:
            print(f"❗️ Could not load embeddings: {e}")
            raise e

        client = QdrantClient(host=self.qdrant_host, port=self.qdrant_port)
        self._vectorstore = Qdrant(
            client=client,
            collection_name=self.collection_name,
            embeddings=embedding_model,
        )

    def load_and_store_docs(self, file_path: str):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        print(f"📄 Loading file: {file_path}")
        loader = TextLoader(file_path)
        documents = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size, chunk_overlap=self.chunk_overlap
        )
        docs = splitter.split_documents(documents)

        if self._vectorstore is None:
            self._init_vectorstore()
        print(f"🔸 Adding {len(docs)} documents to Qdrant")
        self._vectorstore.add_documents(docs)

    def get_qa_chain(self):
        if self._vectorstore is None:
            self._init_vectorstore()
        if self._llm is None:
            self._init_llm()
        retriever = self._vectorstore.as_retriever(
            search_kwargs={"k": self.retriever_k}
        )
        self._qa_chain = RetrievalQA.from_chain_type(llm=self._llm, retriever=retriever)
        return self._qa_chain

    def answer_query(self, query: str):
        if self._qa_chain is None:
            self.get_qa_chain()
        print(f"❓ Query: {query}")
        response = self._qa_chain.run(query)
        print(f"✅ Answer: {response}")
        return response
