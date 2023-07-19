# Threadit

## A social media platform where users can share posts, links, images, and videos in different communities.

Made by: <a href="https://asther.vercel.app">Asther Louie Cabardo</a>

1.  Fork this repository and clone your fork:

    ```shell
    $ cd your_cloned_fork
    $ git checkout dev
    $ git checkout -b my-new-branch

    ```

2.  Install dependencies (we use pnpm):

    ```shell
    $ pnpm install

    ```

3.  Create a .env file in the root with the following content:

    ```shell
    DATABASE_URL=
    NEXTAUTH_SECRET=

    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=

    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=

    REDIS_URL=
    REDIS_SECRET=

    ```

4.  Sync the database schema:

    ```shell
    $ npx prisma generate
    $ npx prisma db push

    ```

5.  Run locally:

    ```shell
    $ pnpm dev

    ```
