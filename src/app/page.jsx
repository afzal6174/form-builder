// "use client";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Plus } from "lucide-react";
import Form from "next/form";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

export default async function Home({ searchParams }) {
  // const { isAuthenticated, redirectToSignIn } = await auth();
  // if (!isAuthenticated) return redirectToSignIn();

  const { template } = await searchParams;
  switch (template) {
    case "all":
      return;
    default:
      return (
        <main className="max-container bg-muted py-6 md:py-10">
          <section>
            <div className="flex justify-between">
              <h2 className="large text-nowrap overflow-hidden">
                Start a new form
              </h2>
              <Form action="/">
                <input name="template" value="all" hidden readOnly />
                <Button type="submit" variant="ghost">
                  <span className="hidden sm:block">Template gallery</span>{" "}
                  <ChevronsUpDown />
                </Button>
              </Form>
            </div>
            <ScrollArea className="pb-2">
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="basis-auto">
                    <Link href="/form">
                      <Card className="w-36 h-36 py-0 cursor-pointer bg-white hover:bg-gray-400">
                        <CardContent className="flex-1 flex items-center justify-center">
                          <Plus className="size-20 text-blue-900" />
                        </CardContent>
                      </Card>
                    </Link>
                    <span className="muted">Blank Form</span>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <ScrollBar
                orientation="horizontal"
                className="hidden md:flex cursor-pointer"
              />
            </ScrollArea>
          </section>
        </main>
      );
  }
}
