# import os
# import shutil
# from pathlib import Path
# from typing import Any, Dict, List

# from django.conf import settings
# from langchain.schema import Document
# from langchain_community.document_loaders import (
#     DirectoryLoader,
#     PyPDFLoader,
#     TextLoader,
#     UnstructuredFileLoader,
#     UnstructuredWordDocumentLoader,
# )
# from langchain_community.vectorstores import FAISS
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_text_splitters import RecursiveCharacterTextSplitter


# class RAGPipeline:
#     _instance = None

#     def __new__(cls, data_dir: str = None):
#         if cls._instance is None:
#             cls._instance = super(RAGPipeline, cls).__new__(cls)
#             cls._instance._initialize(data_dir)
#         return cls._instance

#     def _initialize(self, data_dir: str = None):
#         if data_dir is None:
#             self.data_dir = os.path.join(settings.MEDIA_ROOT, "uploads", "files")
#         else:
#             self.data_dir = data_dir

#         os.makedirs(self.data_dir, exist_ok=True)

#         self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
#         self.vectorstore = None
#         self.retriever = None
#         self._load_or_create_index()

#     def _load_or_create_index(self):
#         if os.path.exists("faiss_index"):
#             try:
#                 self.vectorstore = FAISS.load_local(
#                     "faiss_index", self.embeddings, allow_dangerous_deserialization=True
#                 )
#             except Exception as e:
#                 print(f"Error loading index, rebuilding: {e}")
#                 self._build_index()
#         else:
#             self._build_index()

#         self.retriever = self.vectorstore.as_retriever(search_kwargs={"k": 5})

#     def _build_index(self):
#         # loader = DirectoryLoader(self.data_dir, glob="**/*.*")
#         txt_loader = DirectoryLoader(
#             self.data_dir, glob="**/*.txt", loader_cls=TextLoader
#         )
#         pdf_loader = DirectoryLoader(
#             self.data_dir, glob="**/*.pdf", loader_cls=PyPDFLoader
#         )
#         docx_loader = DirectoryLoader(
#             self.data_dir, glob="**/*.docx", loader_cls=UnstructuredWordDocumentLoader
#         )
#         txt_docs = txt_loader.load()
#         pdf_docs = pdf_loader.load()
#         docx_docs = docx_loader.load()
#         sys_docs = Document(
#             page_content="Please upload documents for processing.",
#             metadata={"source": "system"},
#         )
#         documents = txt_docs + pdf_docs + docx_docs
#         documents.append(sys_docs)
#         text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=64)
#         texts = text_splitter.split_documents(documents)
#         self.vectorstore = FAISS.from_documents(texts, self.embeddings)
#         self.vectorstore.save_local("faiss_index")

#     def retrieve(self, query: str) -> List[Dict[str, Any]]:
#         docs = self.retriever.invoke(query)
#         return [
#             {
#                 "content": doc.page_content,
#                 "metadata": doc.metadata,
#                 "score": doc.metadata.get("score", 0.0),
#             }
#             for doc in docs
#         ]

#     def add_document(self, file_path: str) -> bool:
#         try:
#             if file_path.endswith(".txt"):
#                 loader = TextLoader(file_path)
#             else:
#                 loader = UnstructuredFileLoader(file_path)

#             doc = loader.load()
#             text_splitter = RecursiveCharacterTextSplitter(
#                 chunk_size=512, chunk_overlap=64
#             )
#             texts = text_splitter.split_documents(doc)

#             if not self.vectorstore:
#                 self.vectorstore = FAISS.from_documents(texts, self.embeddings)
#             else:
#                 self.vectorstore.add_documents(texts)

#             self.vectorstore.save_local("faiss_index")
#             filename = os.path.basename(file_path)
#             dest_path = os.path.join(self.data_dir, filename)
#             os.rename(file_path, dest_path)

#             return True
#         except Exception as e:
#             print(f"Error adding document: {e}")
#             return False

#     def get_all_documents(self) -> List[str]:
#         """List all documents in the RAG database"""
#         return [
#             f
#             for f in os.listdir(self.data_dir)
#             if os.path.isfile(os.path.join(self.data_dir, f))
#         ]

#     @classmethod
#     def reset_instance(cls):
#         cls._instance = None
#         if os.path.exists("faiss_index"):
#             shutil.rmtree("faiss_index")
#             print("FAISS index cleared.")
#         cls.vectorstore = None
#         cls.retriever = None


# RAGPipeline.reset_instance()
# rag_pipeline = RAGPipeline()
