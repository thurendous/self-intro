export const contactLinks = [
  { id: "github", url: "https://github.com/thurendous" },
  { id: "x", url: "https://x.com/0xzzwu" },
] as const;

export const products = [
  { id: "tickspace", url: "https://tickspace.markwu.xyz" },
  { id: "jpycWatcher", url: "https://jpyc-watcher.markwu.xyz" },
] as const;

export const sectionIds = ["products", "about", "experience", "skills", "contact"] as const;

export const experience = [
  { id: "jpyc", link: "https://github.com/jcam1/JPYCv2", tags: ["Solidity", "Hardhat", "Audit", "ERC20"] },
  {
    id: "sparknContracts",
    link: "https://github.com/codefox-inc/sparkn-contracts",
    tags: ["Solidity", "Foundry", "Audit"],
  },
  {
    id: "dao",
    link: "https://github.com/codefox-inc/dao-community-contracts",
    tags: ["Solidity", "Audit", "DAO", "ERC20", "ERC1155"],
  },
  {
    id: "sparknApp",
    link: "https://app.sparkn.io/",
    tags: ["Full-stack", "Solidity", "TypeScript", "Next.js", "Supabase", "Prisma"],
  },
  { id: "security", link: "https://github.com/thurendous", tags: ["Security", "Auditing", "EVM"] },
  { id: "agentNft", tags: ["NFT", "ERC1155", "Solidity", "Foundry", "Project management"] },
  { id: "health", tags: ["Solidity", "NFT", "DAO", "ERC20", "ERC1155", "Next.js", "Prisma"] },
] as const;

export const skillGroups = [
  { id: "blockchain", skills: ["Solidity", "EVM", "Foundry", "Hardhat", "OpenZeppelin", "Smart contract audit"] },
  { id: "frontend", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Ethers.js"] },
  { id: "backend", skills: ["Node.js", "Go", "PostgreSQL", "Supabase", "Docker", "REST API"] },
  { id: "tools", skills: ["Git", "CI/CD", "AWS", "Web3.js", "Security research", "Vercel"] },
] as const;
