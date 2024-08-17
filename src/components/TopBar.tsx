import { ModeToggle } from "./ModeToggle";
import { NavigationBar } from "./NavigationBar";
import { Badge } from "./ui/badge";

export default function TopBar() {
  return (
    <div className="fixed w-screen grid items-center grid-cols-[auto_1fr_auto] p-4 z-50">
      <Badge className="h-max">API v0</Badge>
      <NavigationBar />
      <ModeToggle />
    </div>
  );
}
