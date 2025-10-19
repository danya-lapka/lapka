"use client";
import React, { useEffect, useState } from "react";
import { ContentTable } from "@/data/content";
import { A, Button, InputText } from "@/components";
import { ColorsDefault } from "@/components/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import s from "./style.module.scss";

type SortKey = "name" | "status";
type SortOrder = "asc" | "desc";

export default function Page() {
  const [table, setTable] = useState<ContentTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [adminKey, setAdminKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [editItem, setEditItem] = useState<ContentTable | null>(null);
  const [newGame, setNewGame] = useState({ name: "", status: "planned", playlist: "" });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/database/games");
      const data = await res.json();
      setTable(data);
      setLoading(false);
    }
    load();
  }, []);

  const statusOrder: Record<ContentTable["status"], number> = {
    playing: 1,
    planned: 2,
    completed: 3,
    dropped: 4,
  };

  const filtered = table.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sorted.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const deleteGame = async (name: string) => {
    if (!authorized) return alert("Нет доступа");
    if (!confirm(`Удалить "${name}"?`)) return;

    const res = await fetch("/api/database/games", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (res.ok) {
      setTable((t) => t.filter((g) => g.name !== name));
    } else {
      alert(data.error || "Ошибка удаления");
    }
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    const res = await fetch("/api/database/games", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify({
        name: editItem.name,
        status: editItem.status,
        playlist: editItem.playlist,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setEditItem(null);
      alert("✅ Изменения сохранены");
      const refreshed = await fetch("/api/database/games").then((r) => r.json());
      setTable(refreshed);
    } else {
      alert(data.error || "Ошибка обновления");
    }
  };

  const addGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorized) return alert("Нет доступа");
    if (!newGame.name.trim()) return alert("Введите название");

    const res = await fetch("/api/database/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify(newGame),
    });

    const data = await res.json();
    if (res.ok) {
      setNewGame({ name: "", status: "planned", playlist: "" });
      const refreshed = await fetch("/api/database/games").then((r) => r.json());
      setTable(refreshed);
      alert("✅ Игра добавлена");
    } else {
      alert(data.error || "Ошибка добавления");
    }
  };

  if (loading) return <div className="skeleton-table"></div>;

  let id = 1;
  return (
    <div className="f-c gap-20">
      <div className={`${s.controls} f-rw a-center body-5 gap-16`}>
        <InputText
          search
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80"
          color="white"
        >
          Поиск
        </InputText>
        <div className={`${s.sorting} f-r body-5 gap-8`}>
          <Button
            className="j-between w-n125"
            onClick={() => toggleSort("name")}
            color="white"
          >
            Название{" "}
            {sortKey === "name" &&
              (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
          </Button>
          <Button
            className="j-between w-n125"
            onClick={() => toggleSort("status")}
            color="white"
          >
            Статус{" "}
            {sortKey === "status" &&
              (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
          </Button>
        </div>
      </div>

      <div className="f-r gap-12 a-center">
        <InputText
          color="white"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          className="w-n240"
        >Ключ администратора</InputText>
        <Button
          className="body-5"
          color={authorized ? "success" : "white"}
          onClick={() => {
            if (adminKey === process.env.API_SECRET_KEY) {
              setAuthorized(true);
              alert("✅ Доступ разрешён");
            } else alert("Неверный ключ");
          }}

        >
          {authorized ? "Доступ есть" : "Войти"}
        </Button>
      </div>
      <div className="f-c">
        <div
          className={`${s.row} f-r rad-top-16 body-5 bg-white color-black a-center pad-v-12 pad-h-8 gap-16`}
        >
          <span className="w-100">Название</span>
          <span
            className={`f-110 f-r a-center j-center ${s["status-column"]}`}
          >
            Статус
          </span>
          <span className="f-80 f-r a-center j-center">Ссылка</span>
          {authorized && <span className="f-255 f-r a-center j-center">Действия</span>}
        </div>

        {currentItems.map((i) => {
          id++;
          let color: ColorsDefault;
          let text: string;
          let href: string;

          if (i.playlist) {
            color = "white";
            text = "Клик";
            href = i.playlist;
          } else {
            color = "white-gray-2";
            text = "Нету";
            href = "#";
          }

          let status: string;
          let statusText: string;
          switch (i.status) {
            case "playing":
              status = "warn";
              statusText = "Играю";
              break;
            case "completed":
              status = "success";
              statusText = "Прошёл";
              break;
            case "dropped":
              status = "error";
              statusText = "Бросил";
              break;
            case "planned":
              status = "info";
              statusText = "В планах";
              break;
          }

          let bg: string = id % 2 == 0 ? "black" : "gray-3";

          return (
            <div
              key={i.id}
              className={`${s.row} f-r body-5 bg-${bg} a-center pad-v-8 pad-h-8 gap-16`}
            >
              <span className="w-100">{i.name}</span>
              <span
                className={`f-110 bg-${status} color-black f-r a-center j-center pad-all-4 rad-all-4 ${s["status-column"]}`}
              >
                {statusText}
              </span>
              <A className="f-80 f-r a-center j-center" color={color} href={href}>
                {text}
              </A>

              {authorized && (
                <div className="f-255 f-r j-center gap-8">
                  <Button
                    color="info"
                    onClick={() => setEditItem(i)}
                  >
                    Редактировать
                  </Button>
                  <Button color="error" onClick={() => deleteGame(i.name)}>
                    Удалить
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="f-r j-center gap-8 a-center body-5">
        <Button
          color="white"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          ←
        </Button>
        <span>
          {currentPage}/{totalPages}
        </span>
        <Button
          color="white"
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          →
        </Button>
      </div>

      {authorized && (
        <form
          onSubmit={addGame}
          className="f-c gap-12 bg-gray-1 pad-all-24 rad-all-16 body-4 color-black"
        >
          <h3 className="heading-3">Добавление игры</h3>
          <InputText
            color="black"
            value={newGame.name ?? ""}
            onChange={(e) =>
              setNewGame({ ...newGame, name: e.target.value })
            }
          >
            Название
          </InputText>
          <select
            value={newGame.status}
            onChange={(e) =>
              setNewGame({ ...newGame, status: e.target.value as any })
            }
          >
            <option value="playing">Играю</option>
            <option value="planned">В планах</option>
            <option value="completed">Пройдено</option>
            <option value="dropped">Брошено</option>
          </select>
          <InputText
            color="black"
            value={newGame.playlist ?? ""}
            onChange={(e) =>
              setNewGame({ ...newGame, playlist: e.target.value })
            }
          >
            Плейлист
          </InputText>
          <div className="f-r j-between">
            <Button color="black" type="submit">
              Добавить
            </Button>
          </div>
        </form>
      )}

      {editItem && (
        <div className="fixed top-0 left-0 w-100 h-100 f-c j-center a-center">
          <form
            onSubmit={saveEdit}
            className="f-c gap-12 bg-gray-1 pad-all-24 rad-all-16 body-4 color-black"
          >
            <h3 className="heading-3">Редактировать {editItem.name}</h3>
            <select
              value={editItem.status}
              onChange={(e) =>
                setEditItem({ ...editItem, status: e.target.value as any })
              }
            >
              <option value="playing">Играю</option>
              <option value="planned">В планах</option>
              <option value="completed">Пройдено</option>
              <option value="dropped">Брошено</option>
            </select>
            <InputText
              color="black"
              value={editItem.playlist ?? ""}
              onChange={(e) =>
                setEditItem({ ...editItem, playlist: e.target.value })
              }
            >
              Плейлист
            </InputText>
            <div className="f-r j-between">
              <Button color="gray-3" onClick={() => setEditItem(null)}>
                Отмена
              </Button>
              <Button color="black" type="submit">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
