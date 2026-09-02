/* ---------------------------------------------------------------------------
   All site copy lives here. Edit this file, not the components.

   Everything below is drawn from the resume (Aug 2026). Items marked
   NEEDS YOUR WORDS are the only places holding placeholder phrasing — no
   metrics, outcomes or testimonials have been invented.
--------------------------------------------------------------------------- */

export const profile = {
  name: "Ganesh Neelakanta",
  shortName: "GN",
  role: "Generative AI Consultant @Deloitte",
  previously: "Ex-Anblicks",
  // NEEDS YOUR WORDS — the reference site uses "6 years of asking Why until
  // the product gets better." Swap in your own line; this one is fact-safe.
  tagline:
    "3.5 years of turning “can AI actually do this?” into systems that run in production.",
  subline:
    "I build agentic and retrieval systems — multi-agent orchestration, tool calling, RAG over messy enterprise documents — and then own the evaluation, guardrails and incidents that come after launch.",
  location: "Hyderabad, India",
  email: "neelakantaganesh@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/neelakanta-ganesh",
    github: "https://github.com/neelakantaganesh23",
    resume: "/Ganesh-Neelakanta-Resume.pdf",
  },
} as const;

export const nav = [
  { label: "Work", href: "#work", icon: "folder" },
  { label: "About", href: "#about", icon: "smile" },
  { label: "Playground", href: "#playground", icon: "flask" },
  { label: "Resume", href: profile.links.resume, icon: "file", external: true },
  { label: "Contact", href: "#contact", icon: "mail" },
] as const;

/* -------------------------------------------------------------------------
   Hero pipeline diagram — the interactive element.
   Mirrors the architecture of SOWnia: ingest -> chunk -> retrieve ->
   specialist agents -> judge/guardrails -> cited findings.
------------------------------------------------------------------------- */

export type PipelineStage = {
  id: string;
  label: string;
  kicker: string;
  detail: string;
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "ingest",
    label: "Ingest",
    kicker: "PDF · DOCX · PPTX",
    detail:
      "A document lands. Azure Document Intelligence handles OCR, layout and table extraction, with PyMuPDF as a 3-tier fallback when the layout gets hostile.",
  },
  {
    id: "chunk",
    label: "Chunk + Embed",
    kicker: "semantic · layout-aware",
    detail:
      "Slide-level, semantic and fixed-size chunking, tuned per corpus. Embeddings via BGE-Large-EN or text-embedding-3-large — chosen for relevance, latency and cost, not defaults.",
  },
  {
    id: "retrieve",
    label: "Retrieve",
    kicker: "hybrid · rerank",
    detail:
      "Databricks Vector Search with hybrid search, query rewriting, reranking and metadata filtering. RAGAS scores the retrieval before anyone trusts the answer.",
  },
  {
    id: "agents",
    label: "Specialist agents",
    kicker: "tool + function calling",
    detail:
      "Domain agents work the same document in parallel — financial, legal/risk, technical, delivery, strategic — each with its own tools, and confidence-based routing between them.",
  },
  {
    id: "judge",
    label: "Judge + guardrails",
    kicker: "LLM-as-Judge",
    detail:
      "Input validation, output filtering, PII redaction and audit logging. An LLM-as-Judge pass grades grounding and task completion before anything reaches a human.",
  },
  {
    id: "findings",
    label: "Cited findings",
    kicker: "page-level traceability",
    detail:
      "Structured findings with page references, contradiction detection and risk flags — exportable to CSV/PDF as an audit trail.",
  },
];

export const agentNodes = [
  "Financial",
  "Legal / Risk",
  "Technical",
  "Delivery",
  "Strategic",
] as const;

/* -------------------------------------------------------------------------
   Featured work
------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  name: string;
  org: string;
  period: string;
  /** one-line result / impact — shown on the card */
  result: string;
  /** the number that matters, rendered large */
  metric: { value: string; label: string };
  summary: string;
  bullets: string[];
  tags: string[];
  images?: { src: string; alt: string }[];
  /** true => render "Details on request" instead of a link */
  confidential?: boolean;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "sownia",
    name: "SOWnia",
    org: "Deloitte",
    period: "Nov 2025 — Present",
    result:
      "Replaced multi-expert, multi-day Statement of Work reviews with structured findings in minutes.",
    metric: { value: "8", label: "specialist review agents" },
    summary:
      "An AI-powered Statement of Work review system. Upload a PDF or DOCX, pick a review angle, and specialised agents return page-referenced findings with contradiction detection and risk flags.",
    bullets: [
      "Eight specialised review agents across financial, legal/risk, technical, delivery, organisational and strategic domains, built on Claude Opus with LangChain and MCP tool/function-calling integrations.",
      "Confidence-based routing, contradiction detection and risk flagging, all traceable to the page the claim came from.",
      "Human-in-the-loop checkpoints, plus CSV/PDF audit-trail exports for review sign-off.",
      "Context engineering — dynamic context assembly, compression and conversation memory — to hold continuity across long agent sessions.",
      "Guardrails architecture (input validation, output filtering, PII redaction, audit logging) and an agent evaluation framework with grading rubrics measuring accuracy, grounding and task completion.",
    ],
    tags: [
      "Claude Opus",
      "LangChain",
      "MCP",
      "FastAPI",
      "React",
      "Azure Document Intelligence",
      "LangSmith",
    ],
    images: [
      {
        src: "/projects/sownia/02-upload.png",
        alt: "SOWnia upload screen — review SOW documents in minutes, not days",
      },
      {
        src: "/projects/sownia/03-review.png",
        alt: "SOWnia review results — risk score, executive summary and findings count",
      },
      {
        src: "/projects/sownia/04-dashboard.png",
        alt: "SOWnia dashboard — review history and risk analytics",
      },
      {
        src: "/projects/sownia/01-login.png",
        alt: "SOWnia sign-in screen",
      },
    ],
  },
  {
    slug: "creative-copy",
    name: "AI-Powered Creative Copy Multi-Agent System",
    org: "Anblicks",
    period: "Nov 2024 — Apr 2025",
    result:
      "Cut marketing copy creation from hours to minutes — an 85% reduction in manual effort.",
    metric: { value: "85%", label: "reduction in manual effort" },
    summary:
      "A 4-stage multi-agent pipeline producing brand-compliant marketing copy for three audience segments across Email, SMS and Mobile.",
    bullets: [
      "LangGraph-orchestrated decision branching and error recovery across four pipeline stages.",
      "Gemini-powered attribute enrichment feeding Azure OpenAI content generation.",
      "LLM-as-Judge compliance refinement enforcing brand rules automatically.",
      "Snowflake caching layer preventing repeated content across campaign runs.",
      "Prompt versioning and structured output formatting to systematically raise response quality.",
    ],
    tags: [
      "Azure OpenAI",
      "Google Gemini",
      "LangChain",
      "LangGraph",
      "Snowflake",
      "FastAPI",
      "React",
    ],
    confidential: true,
  },
  {
    slug: "rag-assistants",
    name: "Advanced RAG Knowledge Assistants",
    org: "Anblicks",
    period: "Jul 2024 — Oct 2024",
    result:
      "Three agentic RAG assistants in production for HR, Supply Chain and Legal.",
    metric: { value: "3", label: "domains live in production" },
    summary:
      "Enterprise knowledge assistants over PPTX and PDF corpora, with the retrieval quality, security and model governance a production deployment actually requires.",
    bullets: [
      "3-tier document extraction and OCR via Azure Document Intelligence with PyMuPDF, handling layout and table extraction.",
      "Slide-level, semantic and fixed-size chunking strategies matched to each corpus.",
      "Databricks Vector Search with hybrid search, query rewriting, reranking and metadata filtering.",
      "BGE-Large-EN and text-embedding-3-large embeddings tuned for relevance, latency and cost; LangChain LCEL RAG chains.",
      "RAGAS evaluation, AES-256 encrypted chat history, Active Directory authentication, MLflow versioning with Unity Catalog registration and LangSmith tracing.",
      "Scale-to-zero model serving behind FastAPI and React frontends.",
    ],
    tags: [
      "Databricks Vector Search",
      "LangChain LCEL",
      "BGE-Large-EN",
      "RAGAS",
      "MLflow",
      "Unity Catalog",
      "LangSmith",
    ],
    confidential: true,
  },
];

/* -------------------------------------------------------------------------
   Playground / experiments
   ADD YOUR OWN: append entries here for side projects and write-ups.
   `href` renders the "Read more" link; omit it and the card stays a
   plain write-up with no link.
------------------------------------------------------------------------- */

export type Experiment = {
  title: string;
  blurb: string;
  stack: string[];
  period?: string;
  href?: string;
};

export const experiments: Experiment[] = [
  {
    title: "Multilingual TTS voice-over pipeline",
    period: "Mar 2025 — Jun 2025",
    blurb:
      "A modular text-to-speech architecture with thread-based concurrent synthesis and provider-switching between Azure Speech and Databricks. The interesting part: a phonetic placeholder engine that protects brand-critical terms from translation distortion across 130+ languages.",
    stack: [
      "Google Cloud Translate v2",
      "Chirp3-HD",
      "Azure Speech",
      "Databricks",
      "FastAPI",
    ],
  },
  {
    title: "Voice of Customer sentiment at 5M rows",
    blurb:
      "Parallel LLM inference over 5 million customer feedback entries across five domains, with adaptive DSPy prompting and idempotent Delta Merge so reruns stay cheap. Output quality graded with LLM-as-Judge alongside ROUGE and BLEU.",
    stack: ["DSPy", "PySpark", "Delta Lake", "Databricks", "ROUGE / BLEU"],
  },
  {
    title: "Forecasting Snowflake credit burn",
    blurb:
      "Time series forecasting and anomaly detection over Snowflake credit usage — ARIMA, SARIMA and XGBoost compared on the same series — to catch cost spikes before the invoice does.",
    stack: ["ARIMA", "SARIMA", "XGBoost", "Snowflake"],
  },
];

/* -------------------------------------------------------------------------
   About
------------------------------------------------------------------------- */

export const about = {
  heading: "A record of curiosity",
  lede: "I started in data pipelines and ended up building the agents that read what those pipelines carry.",
  paragraphs: [
    "I am an AI Engineer with 3.5 years designing and deploying production-grade agentic AI, generative AI and retrieval solutions. In practice that means LLM agents with tool and function calling, multi-step orchestration and guardrails; Databricks Vector Search, Unity Catalog and MLflow; RAG and Document AI across OCR, chunking, embeddings, hybrid search and reranking; and API integrations spanning Azure OpenAI, Gemini and Claude.",
    "The part I care about most is what happens after the demo. Evaluation frameworks, monitoring, incident resolution — the unglamorous work that decides whether a system is a prototype or a product. I have delivered an 85% reduction in manual effort on one pipeline and owned production reliability on the rest.",
    "I also spend a lot of time with stakeholders: gathering requirements, defining acceptance criteria, writing the technical designs and test plans, and translating findings into recommendations people can act on.",
  ],
  timeline: [
    {
      org: "Deloitte",
      role: "Generative AI Consultant",
      period: "Nov 2025 — Present",
      place: "Hyderabad",
    },
    {
      org: "Anblicks",
      role: "AI and Data Engineer",
      period: "Jun 2023 — Oct 2025",
      place: "Hyderabad",
    },
    {
      org: "Anblicks",
      role: "Data Engineering Trainee",
      period: "Mar 2023 — May 2023",
      place: "Hyderabad",
    },
    {
      org: "CVR College of Engineering",
      role: "B.Tech, Electronics & Communication — CGPA 8.24/10",
      period: "2019 — 2023",
      place: "Hyderabad",
    },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Generative & Agentic AI",
    items: [
      "Multi-Agent Systems",
      "Tool / Function Calling",
      "Multi-Step Orchestration",
      "MCP",
      "Agentic RAG",
      "LLM-as-Judge",
      "Prompt & Context Engineering",
      "Guardrails",
      "Hallucination Detection",
      "Fine-tuning",
    ],
  },
  {
    group: "Agent frameworks",
    items: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "DSPy",
      "Pydantic AI",
      "CrewAI",
      "AutoGen",
      "Hugging Face",
      "Microsoft Foundry",
    ],
  },
  {
    group: "RAG, search & Document AI",
    items: [
      "OCR",
      "Layout / Table Extraction",
      "Multimodal LLMs",
      "Azure Document Intelligence",
      "Pinecone",
      "Semantic Chunking",
      "Hybrid Search",
      "Reranking",
      "Query Rewriting",
      "RAGAS",
    ],
  },
  {
    group: "Databricks & data",
    items: [
      "Vector Search",
      "Unity Catalog",
      "MLflow",
      "Delta Lake",
      "Genie",
      "Scale-to-Zero Serving",
      "PySpark",
      "Delta Merge",
      "Azure Data Factory",
    ],
  },
  {
    group: "Models & clouds",
    items: [
      "Azure OpenAI",
      "Claude",
      "Gemini",
      "OpenAI API",
      "AWS Bedrock",
      "GCP Vertex AI",
      "SageMaker",
      "Snowflake",
    ],
  },
  {
    group: "Engineering",
    items: [
      "Python",
      "FastAPI",
      "Pydantic",
      "SQL",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Azure DevOps",
      "JWT",
      "AES-256",
      "PII Redaction",
    ],
  },
];

/* -------------------------------------------------------------------------
   Certifications — standing in for testimonials until real quotes exist.
   To switch: set showRecommendations = true and fill `recommendations`.
------------------------------------------------------------------------- */

export const showRecommendations = false;

export type Recommendation = {
  quote: string;
  name: string;
  title: string;
};

// PASTE REAL QUOTES HERE, then flip showRecommendations above to true.
export const recommendations: Recommendation[] = [];

export const certifications = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "Jul 2026",
  },
  { name: "Generative AI Leader", issuer: "Google Cloud", date: "Jul 2026" },
  {
    name: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    date: "May 2026",
  },
  { name: "Claude Code in Action", issuer: "Anthropic", date: "Feb 2026" },
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "Sep 2025",
  },
  {
    name: "LangGraph Certification",
    issuer: "LangChain Academy",
    date: "Aug 2025",
  },
  { name: "Snowflake Squad 2025", issuer: "Snowflake", date: "Jan 2025" },
  { name: "AI Expert Badge", issuer: "Deloitte", date: "" },
];

export const contact = {
  heading: "Let us build something that survives production.",
  body: "Open to conversations about agentic systems, RAG at enterprise scale, and the evaluation work that keeps both honest.",
};
