"use client";
import React, { useEffect, useState } from "react";
import { ContentTable } from "@/data/content";
import { A, Button } from "@/components";
import { Colors } from "@/components/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import s from './style.module.scss';

type SortKey = "name" | "status";
type SortOrder = "asc" | "desc";

export default function Page() {
  const [table, setTable] = useState<ContentTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/database/games");
      const data = await res.json();
      setTable(data);
      setLoading(false);
    }
    load();
  }, []);

  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const statusOrder: Record<ContentTable["status"], number> = {
    playing: 1,
    planned: 2,
    completed: 3,
    dropped: 4,
  };

  const sorted = [...table].sort((a, b) => {
    const dir = sortOrder === "asc" ? 1 : -1;

    if (sortKey === "name") {
      return a.name.localeCompare(b.name) * dir;
    }
    if (sortKey === "status") {
      const diff = statusOrder[a.status] - statusOrder[b.status];
      return diff * dir;
    }

    return 0;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading) {
    return (
      <div className="skeleton-table"></div>
    );
  }

  

  let id: number = 1;
  return (
    <div className="f-c gap-20">
      <div className={`${s[`sorting`]} f-r w-fit body-5 gap-8`}>
          <Button className="j-between" onClick={() => {toggleSort("name")}} color="white">
            Name {sortKey === "name" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
          </Button>
          <Button className="j-between" onClick={() => {toggleSort("status")}} color="white">
            Status {sortKey === "status" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
          </Button>
        </div>
      <div className="f-c">
        <div className={`${s[`row`]} f-r rad-top-16 body-5 bg-white color-black a-center pad-v-12 pad-h-8`}>
          <span className="w-100">Название</span>
          <span className={`w-25 text-center ${s[`status-column`]}`}>Статус</span>
          <span className="w-25 text-center">Ссылка</span>
        </div>
        {sorted.map((i) => {
          id++;
          let color: Colors;
          let text: string;
          let href: string;
  
          if (i.playlist) {
            color = 'white';
            text = 'Клик';
            href = i.playlist;
          } else {
            color = 'white-alt';
            text = 'Нету';
            href = '#';
          }
  
          let status: string;
          switch (i.status) {
            case 'playing': status = 'warn'; break;
            case 'completed': status = 'success'; break;
            case 'dropped': status = 'error'; break;
            case 'planned': status = 'info'; break;
          }
  
          let bg: string;
          bg = id % 2 == 0 ? 'black' : 'gray-3';
  
          return (
            <div key={i.id} className={`${s[`row`]} f-r body-5 bg-${bg} a-center pad-v-8 pad-h-8`}>
              <span className="w-100">{i.name}</span>
              <span className={`w-25 bg-${status} color-black text-center pad-all-4 rad-all-4 ${s[`status-column`]}`}>
                {i.status}
              </span>
              <A className="w-25 text-center" color={color} href={href}>{text}</A>
            </div>
          );
        })}
        <div className={`${s[`row`]} f-r body-5 bg-white color-black a-center pad-v-8 pad-h-8 rad-bottom-16`}>
              <span className="w-100">Записи стримов</span>
              <span className={`w-25 bg-accent color-black text-center pad-all-4 rad-all-4 ${s[`status-column`]}`}>
                Стримы
              </span>
              <A className="w-25 text-center" color='black' href='https://www.youtube.com/playlist?list=PLgPYefSLHqt-8RueFtkjDIXCgXp37XHBe'>Клик</A>
            </div>
      </div>
    </div>
  );
}