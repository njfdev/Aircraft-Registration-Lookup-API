import { ModeToggle } from "./ModeToggle";
import { NavigationBar } from "./NavigationBar";
import { Badge } from "./ui/badge";

export default function TopBar() {
  return (
    <div className="fixed w-screen grid items-center grid-cols-[auto_1fr_auto] p-4">
      <Badge className="h-max z-20">API v0</Badge>
      <NavigationBar />
      <ModeToggle />
    </div>
  );
}
