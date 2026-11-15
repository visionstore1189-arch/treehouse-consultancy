# Private GitHub repository setup

The deliverable is ready for a private Git repository. No remote repository has been created or pushed because no GitHub owner/repository was supplied or connected. The private source repository and public compiled website are separate surfaces.

## Create the repository

1. Sign in to the client's or developer's GitHub account. Create a repository such as `treehouse-consultancy-website` and select **Private**. Do not initialise a second README if pushing this existing directory.
2. Grant only the named developers access. Enable MFA on the account and agree ownership and recovery contacts.
3. From this project directory:

```sh
git init -b main
git add .
git status
# Verify that no .env.local, .dev.vars, node_modules, out, or secrets appear.
git commit -m "Build bilingual Treehouse corporate website"
git remote add origin git@github.com:YOUR_OWNER/treehouse-consultancy-website.git
git push -u origin main
```

If a local repository already exists, skip `git init` and inspect `git remote -v` before adding a remote. Authenticate using SSH or GitHub's standard credential flow; never paste tokens into a remote URL or commit them.

4. Connect this private repository to Cloudflare Pages. Grant the GitHub app access to this repository only. A private GitHub repository does not make the public Pages deployment private.
5. Develop on feature branches and review preview deployments before merging. Keep secrets in Cloudflare and GitHub secret stores as appropriate, not in source or Actions output.

## Basic checks

The included `.github/workflows/checks.yml` installs from the lockfile, type-checks, tests, builds and verifies exported links. It makes no deployments and needs no API tokens. Running it uses the account's included Actions allowance; monitor private-repository minutes and keep the account on its free plan.

Do not upload client documents, the Mutabiq regulatory library, production database exports or backup files to this repository. Add editor access through the eventual CMS's identity controls rather than broad repository administrator access.
