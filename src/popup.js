// 'use strict';

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import logoPath from '../public/icons/ls-icon-192x192.png';
import { Separator } from '@/components/ui/separator';

// const logoPath = '/public/icons/ls-icon-192x192.png';

// public\icons\ls-icon-192x192.png

import './popup.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { CoffeeIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function AvatarDemo() {
  return (
    <Avatar className="h-16 w-16 border-2 border-stone-950">
      <AvatarImage
        src="https://media.licdn.com/dms/image/D5603AQGQW2ZzqPrtjg/profile-displayphoto-shrink_800_800/0/1692444763039?e=1715212800&v=beta&t=NoT6MCKwgp0w_k8F7ZcHk92OIYhIsDCizhf7pfv1dGg"
        alt="@shadcn"
      />
      <AvatarFallback>KN</AvatarFallback>
    </Avatar>
  );
}

const Popup = () => {
  return (
    <div className="w-[275px] h-max flex flex-col justify-center p-4">
      <div className="flex flex-row gap-2 justify-between items-center">
        <img src={logoPath} alt="LinkStrip" className="w-12 h-12"></img>
        <div className="flex flex-col justify-start">
          <h1 className="font-bold text-xl">LinkStrip</h1>
          <h2 className="text-sm">
            Strip the 💩 out of your LinkedIn feed. Fast. Easy. Free.
          </h2>
        </div>
      </div>
      <Separator className="mt-2 mb-2" />
      <div className="flex flex-col justify-center items-center gap-3">
        <h2 className="flex justify-center text-sm">
          Welcome 💃🕺, LinkedIn Creator!
        </h2>
        <div className="flex flex-row justify-center gap-2 items-center">
          <AvatarDemo />
          <div>
            <header className="font-bold">Ky Nam 🥂</header>
            <span>
              I'm an indie hacker & startup builder. Also makes content on tech
              & business for dummies
            </span>
          </div>
        </div>

        <div>
          <div className="mt-4"></div>
          <CommandDemo />
        </div>
        <Accordion
          type="single"
          collapsible
          className="self-start whitespace-pre-wrap"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Note/Update</AccordionTrigger>
            <AccordionContent className="whitespace-break-spaces">
              - If you see too few posts loaded, try using more flexible
              filters. <br />
              <br />- For filter tag Include/Exclude, try to always use mode OR.{' '}
              <br />
              <br />- For filter tags Include, try to define as many relevant
              tags as possible.
              <br />
              <br />- For filter tags Exclude, try to define as few tags as
              possible. <br />
              <br />- Sometimes, it feels like LinkStrip makes LinkedIn loads
              slower.But it's usually because there's no more posts to load that
              meets the criteria, and LinkedIn is trying to fetch more posts.
              <br />
              <br />- I don't recommend using Include tag filters with only a
              few keywords and mode AND. This will make the filter very
              aggressive and hide most posts, causing the feed to be empty. If
              you think this is nice, then good.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<Popup />);

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <CommandList>
        {/* <CommandEmpty>No results found.</CommandEmpty> */}
        <CommandGroup
          className=""
          heading="If you find LinkStrip cool, pls consider:"
        >
          <CommandItem>
            <CoffeeIcon className="mr-2 h-4 w-4" />
            <a href="https://ko-fi.com/kynam" target="_blank">
              Buy me a coffee, I'm poor
            </a>
          </CommandItem>
          <CommandItem>
            <StarFilledIcon className="mr-2 h-4 w-4" />
            <a href="https://placeholder-url.com " target="_blank">
              Give 5* on store
            </a>
          </CommandItem>
          <CommandItem>
            <LinkedInLogoIcon className="mr-2 h-4 w-4" />
            <a href="https://www.linkedin.com/in/kynamnguy/" target="_blank">
              My LinkedIn (dm bug report)
            </a>
          </CommandItem>
          <CommandItem>
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            <a href="https://github.com/knamnguyen/LinkStrip" target="_blank">
              Contribute Github
            </a>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
