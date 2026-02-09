# Contributor attribution (shris-ai only)

If **shristur** (or another identity) appears on the repo’s GitHub Contributors list and you want only **shris-ai** to show:

## 1. Use the same email on GitHub (recommended)

GitHub attributes commits by **email**. To merge contributions into **shris-ai**:

1. Log in to GitHub as **shris-ai**.
2. Go to **Settings → Emails**.
3. **Add** the email address that was used for the commits showing as “shristur” (e.g. from another machine or an old account).
4. Verify that email if GitHub asks.
5. After a while, GitHub will recalculate and those commits can show under **shris-ai**.

So: any address you’ve ever used to commit to this repo should be added to the **shris-ai** account.

## 2. .mailmap in this repo

The **.mailmap** file in the repo root maps multiple Git identities to one canonical author. Git (and some tools) use it so `git log` and `git shortlog` show a single contributor.

- GitHub’s Contributors graph may or may not fully respect .mailmap.
- If you see “shristur” in `git log` or on GitHub, you can add a line to **.mailmap**:

  ```text
  Shristi Gautam <44741669+shris-ai@users.noreply.github.com> shristur <email-used-by-shristur@example.com>
  ```

  Replace `email-used-by-shristur@example.com` with the real email used for those commits (you can see it in `git log` or on the commit on GitHub).

## 3. Finding the email used by “shristur”

- On GitHub: open a commit that shows “shristur” as author and check the author email (if it’s not hidden).
- Locally (if those commits exist in your clone):  
  `git log --all --format='%an <%ae>' | sort -u`

After adding that email to the **shris-ai** account (step 1), the Contributors list should eventually show only **shris-ai**.
