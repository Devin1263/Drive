import "~/styles/globals.css";

export const mockData = [
    {
        name: "Documents",
        type: "folder",
        children: [
            { name: "Resume.pdf", type: "file", size: "120KB", link: "#" },
            { name: "ProjectProposal.docx", type: "file", size: "200KB", link: "#" }
        ]
    },
    {
        name: "Photos",
        type: "folder",
        children: [
            { name: "Vacation.jpg", type: "file", size: "2MB", link: "#" },
            { name: "Family.png", type: "file", size: "1.5MB", link: "#" }
        ]
    },
    {
        name: "Notes.txt",
        type: "file",
        size: "10KB",
        link: "#"
    }
];