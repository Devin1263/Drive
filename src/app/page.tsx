"use client";

import React, { useState, useEffect } from "react";
import { mockData } from "~/mockData";
import "../styles/globals.css";
import { Sun, Moon, Upload } from "lucide-react";

const DrivePage = () => {
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem("darkMode");
        if (storedMode) {
            setDarkMode(JSON.parse(storedMode));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        document.body.className = darkMode ? "dark" : "light";
    }, [darkMode]);

    const navigateTo = (folderName: string) => {
        setCurrentPath([...currentPath, folderName]);
    };

    const navigateBack = () => {
        setCurrentPath(currentPath.slice(0, -1));
    };

    const getCurrentDirectory = () => {
        let currentDirectory = mockData;
        for (const folder of currentPath) {
            currentDirectory = currentDirectory.find(item => item.name === folder)?.children || [];
        }
        return currentDirectory;
    };

    return (
        <div className={`${darkMode ? "dark" : "light"} min-h-screen p-8`}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Devin's Drive</h1>
                <div className="flex gap-4 items-center">
                    <button onClick={() => setDarkMode(prev => !prev)} className="flex items-center gap-1">
                        {darkMode ? <Sun /> : <Moon />} Dark Mode
                    </button>
                    <button className="flex items-center gap-1">
                        <Upload /> Upload
                    </button>
                </div>
            </div>
            {currentPath.length > 0 && (
                <button onClick={navigateBack} className="mb-4">Back</button>
            )}
            <table className="w-full border border-gray-700 rounded-lg">
                <thead>
                <tr className="border-b border-gray-700">
                    <th className="p-2">Name</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Size</th>
                </tr>
                </thead>
                <tbody>
                {getCurrentDirectory().map((item) => (
                    <tr key={item.name} onClick={() => item.type === "folder" ? navigateTo(item.name) : null} className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
                        <td className="p-2 flex items-center">
                            {item.type === "folder" ? "📁" : "📄"}
                            {item.type === "file" ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2">{item.name}</a>
                            ) : (
                                <span className="ml-2">{item.name}</span>
                            )}
                        </td>
                        <td className="p-2">{item.type}</td>
                        <td className="p-2">{item.size || "-"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DrivePage;