import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-4 pb-4">
      <div className="flex flex-row justify-between">
        <ul className="flex flex-row flex-wrap gap-4 justify-center">
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li className="dark:text-muted-foreground">•</li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            <Link href="/terms">Terms of Service</Link>
          </li>
        </ul>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Crafted by{" "}
          <span className="font-semibold text-foreground">RoastYourFriend</span>
        </p>
      </div>
    </footer>
  );
}
