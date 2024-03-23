import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdEditDocument } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";

export function BestComputer() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="bg-background">
          Best Computer T.C.
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/blog/category/notice">
            <DropdownMenuItem className="flex justify-between">
              Notice
              <TfiAnnouncement />
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <span>Result</span>
            <DropdownMenuShortcut>
              <GrDocumentPerformance />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <Link href="/application">
            <DropdownMenuItem className="flex justify-between">
              <div className="flex items-center gap-3">
                <span>Apply Now</span>
                <div className="h-2 w-2 animate-ping rounded-full bg-primary"></div>
              </div>
              <MdEditDocument />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Course Module</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>Office Application</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>DataBase Programming</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Digital Marketing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Graphics Design</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Motions Graphics</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Web Design & Development</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Video Editing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Ethical Hacking</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Python Programming</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Typing Test</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>Bangla</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
