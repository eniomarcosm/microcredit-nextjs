# Microcredit System

A web system built with Next.js to manage microcredit operations, including loan granting, payment tracking, client management, and branches.

## Features

- **Client Management:** Register, view, and edit client information.
- **Loan Management:** Create, approve, disburse, and track loans (active, overdue, paid, etc.).
- **Payment Management:** Record and track payments made by clients.
- **Interactive Dashboard:** View metrics and financial reports via charts (using Recharts).
- **Authentication & Authorization:** Integration with `next-auth` to manage user sessions.
- **RESTful API:** Well-defined endpoints for backend interaction.
- **ORM Database:** Use of Prisma to interact with the database securely and efficiently.

## Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- **Database:** [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/))
- **Charts:** [Recharts](https://recharts.org/)

## Prerequisites

- [Node.js](https://nodejs.org/) (version >= 18.17.0 or >= 20.3.0 for sharp and Node-API v9)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) (or another database compatible with Prisma)
- (Optional) [Google Maps API Key](https://developers.google.com/maps)
- (Optional) Google OAuth Client ID and Secret
- (Optional) OpenAI API Key (if using assistants)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_PROJECT_NAME>
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Configure environment variables:**

    - Create a `.env.local` file in the root of the project based on the example below and fill in the required environment variables with your values.

    ```env
    # Google Keys
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=

    # Prisma / Database
    DATABASE_URL=""

    # NextAuth Configuration
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=http://localhost:3000

    # OpenAI (Optional - for assistants)
    # OPENAI_API_KEY=
    # ASSISTANT_ID=
    ```

4.  **Configure the database (Prisma):**

    - Run Prisma migrations to create the database schema:
      ```bash
      npx prisma migrate dev
      ```
    - Regenerate the Prisma client (optional, but recommended after migrations):
      ```bash
      npx prisma generate
      ```

5.  **Start the development server:**

    ```bash
    pnpm run dev
    ```

6.  **The server will be available at `http://localhost:3000`.**

## Authors

- **Énio Marcos** - [@eniomarcosm](https://github.com/eniomarcosm)
