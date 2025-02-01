"use client";

import React, { useState } from "react";
import { Folder, File, Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Item, File as FileType } from "./types";

const initialData: Item[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "2023-05-15",
    children: [
      {
        id: "2",
        name: "Resume.pdf",
        type: "file",
        url: "/files/resume.pdf",
        size: "250 KB",
        modified: "2023-05-10",
      },
      {
        id: "3",
        name: "Cover Letter.docx",
        type: "file",
        url: "/files/cover-letter.docx",
        size: "75 KB",
        modified: "2023-05-12",
      },
    ],
  },
  {
    id: "4",
    name: "Images",
    type: "folder",
    modified: "2023-05-14",
    children: [
      {
        id: "5",
        name: "Profile Picture.jpg",
        type: "file",
        url: "/files/profile-picture.jpg",
        size: "2.5 MB",
        modified: "2023-05-13",
      },
      {
        id: "6",
        name: "Vacation",
        type: "folder",
        children: [],
        modified: "2023-05-14",
      },
    ],
  },
  {
    id: "7",
    name: "Project Proposal.pptx",
    type: "file",
    url: "/files/project-proposal.pptx",
    size: "1.2 MB",
    modified: "2023-05-11",
  },
];

const DriveClone: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Folder[]>([]);

  const handleUpload = () => {
    // Mock upload functionality
    console.log("Upload button clicked");
  };

  const navigateToFolder = (folder: Folder) => {
    setCurrentFolder(folder);
    setBreadcrumbs((prev) => [...prev, folder]);
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === 0) {
      setCurrentFolder(null);
      setBreadcrumbs([]);
    } else {
      setCurrentFolder(breadcrumbs[index - 1]);
      setBreadcrumbs((prev) => prev.slice(0, index));
    }
  };

  const renderBreadcrumbs = () => (
    <div className="text-muted-foreground mb-4 flex items-center space-x-2">
      <button
        onClick={() => navigateToBreadcrumb(0)}
        className="hover:text-foreground"
      >
        My Drive
      </button>
      {breadcrumbs.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <ChevronRight className="h-4 w-4" />
          <button
            onClick={() => navigateToBreadcrumb(index + 1)}
            className="hover:text-foreground"
          >
            {folder.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );

  const renderItems = (items: Item[]) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="hover:bg-secondary flex items-center justify-between rounded p-2 transition-colors"
        >
          <div className="flex items-center space-x-2">
            {item.type === "folder" ? (
              <Folder className="h-5 w-5 text-yellow-500" />
            ) : (
              <File className="h-5 w-5 text-blue-500" />
            )}
            <span
              className={item.type === "folder" ? "cursor-pointer" : ""}
              onClick={() =>
                item.type === "folder" && navigateToFolder(item as Folder)
              }
            >
              {item.name}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center space-x-4 text-sm">
            <span>{item.type === "file" ? item.size : "--"}</span>
            <span>{item.modified}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Google Drive Clone</h1>
        <Button onClick={handleUpload} variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      {renderBreadcrumbs()}
      <div className="bg-card rounded-lg p-4">
        {renderItems(currentFolder ? currentFolder.children : initialData)}
      </div>
    </div>
  );
};

export default DriveClone;
