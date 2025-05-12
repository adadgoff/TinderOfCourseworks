This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Feature Sliced Design

```bash
src
|- app        # Initializing application logic.
|- processes  # [Optional] Processes of application over pages.
|- pages      # Pages of application.
|- widgets    # Independent and complete blocks for pages.
|- features   # [Optional] Features for business logic.
|- entities   # [Optional] Business entities for domain.
|- shared     # Reusable modules without connection to business logic.
```

## TODO

- [ ] Sort imports & exports.
- [ ] Add "sign in" / "sign up" buttons in header.
- [ ] use details/summary for accordion.
- [ ] Login/Register Pages: submit validation - same passwords with RepeatPasswordInput.
- [ ] Login/Register Pages: use Special Inputs for RepeatPassword, NameInput, etc.
- [ ] Coursework Create/Edit Pages: save/cancel changes disabled if no changes

### Backend Microservices

- [ ] Images

- [ ] Auth
- [ ] Student Profile
- [ ] Supervisor Profile

- [ ] Student Coursework
- [ ] Supervisor Coursework
- [ ] RecSys
- [ ] Matches
- [ ] Approves

## Questions to reviewer

- [ ] Which way better to implement `vr`?
- [ ] What to better use for hover show elements: css or js? (input).

## Future improvements

- [ ] Do adaptive versions
- [ ] Add languages support
- [ ] Do more available interfaces
- [ ] Improve code decisions (e.g. <Link><Button></Button></Link> is overkill)
- [ ] Create infrastructure:
  - [ ] Add logging & monitoring: Grafana | Prometheus | Jaeger
  - [ ] Add CI/CD: Jenkins
- [ ] Improve recommender system based on user story: UserKNN / ItemKNN instead of SQL queries
- [ ] Add filters in recommender system
- [ ] Add more bio info in profiles (Contacts, Education/Teaching/Working/Research and Publications)

## Pages

| page/role         | students | supervisor |
| ----------------- | -------- | ---------- |
| courseworks       | ✅       | 🔲         |
| coursework-create | ✅       | 🔲         |
| coursework-edit   | ✅       | 🔲         |
| coursework-view   | ✅       | 🔲         |
| explore           | 🔲       | 🔲         |
| explore-history   | 🔲       | 🔲         |
| matches           | 🔲       | 🔲         |
| matches-history   | 🔲       | 🔲         |
| approves          | 🔲       | 🔲         |
| approves-history  | 🔲       | 🔲         |
| profile           | 🔲       | 🔲         |
| profile-view      | ✅       | 🔲         |
| profile-edit      | ✅       | 🔲         |
