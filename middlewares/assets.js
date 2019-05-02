import express from "express";
import path from "path";

export default function () {
    return express.static(path.join(process.cwd(), "public"))
};
