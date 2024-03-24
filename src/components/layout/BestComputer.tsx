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
                <Link href="/blog/category/office_application">
                  <DropdownMenuItem>Office Application</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/database_programming">
                  <DropdownMenuItem>DataBase Programming</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/digital_marketing">
                  <DropdownMenuItem>Digital Marketing</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/graphics_design">
                  <DropdownMenuItem>Graphics Design</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/motions_graphics">
                  <DropdownMenuItem>Motions Graphics</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/web_design_and_development">
                  <DropdownMenuItem>Web Design & Development</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/video_editing">
                  <DropdownMenuItem>Video Editing</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/ethical_hacking">
                  <DropdownMenuItem>Ethical Hacking</DropdownMenuItem>
                </Link>
                <Link href="/blog/category/python_programming">
                  <DropdownMenuItem>Python Programming</DropdownMenuItem>
                </Link>
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
                  <Link href="/typingtest/bangla">Bangla</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/typingtest/english">English</Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
