// release.config.js (or semantic-release config)
module.exports = {
  branches: [
    "main", // stable releases
    { name: "next", prerelease: true }, // pre-releases (e.g., 1.3.0-next.1)
    // do NOT include "develop" – no releases from integration
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { npmPublish: false }],
    [
      "@semantic-release/git",
      {
        assets: [
          "CHANGELOG.md",
          "package.json",
          "package-lock.json",
          "pnpm-lock.yaml",
        ],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};
