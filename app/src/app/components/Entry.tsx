"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "./layout/sidebar";
import { Content } from "./layout/content";
import { Auth } from "./auth/auth";
import {
  User,
  TokenValidationResult,
  JWTPayload,
} from "./interface/interface";

//エントリーポイント
export const Entry = () => {
  // ログイン後かどうか（初期は「未判定」）
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 選択中のコンテンツ名を格納する
  const [selectedContent, setSelectedContent] = useState("characterRegist");

  // ログイン中のユーザー情報
  const [user, setUser] = useState<User>();

  // トークン情報
  const [token, setToken] = useState<string | null>(null);

  // JWTトークンの検証関数
  const validateToken = (token: string): TokenValidationResult => {
    try {
      const base64Payload = token.split(".")[1];
      if (!base64Payload) {
        return {
          isValid: false,
          isExpired: false,
          error: "無効なJWTフォーマット",
        };
      }

      const payload: JWTPayload = JSON.parse(atob(base64Payload));
      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp < currentTime;

      return {
        isValid: true,
        isExpired,
        payload,
        error: isExpired ? "トークンの期限が切れています" : undefined,
      };
    } catch (error) {
      return {
        isValid: false,
        isExpired: false,
        error: `トークンのデコードに失敗: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  };

  // 期限切れトークンをクリーンアップする関数
  const clearExpiredToken = (): void => {
    localStorage.removeItem("auth_token");
  };

  // 初回マウント時にユーザーデータを取得
 useEffect(() => {
  const storedToken = localStorage.getItem("auth_token");

  if (storedToken) {
    const validationResult = validateToken(storedToken);

    if (!validationResult.isValid || validationResult.isExpired) {
      console.log("保存されたトークンが無効です:", validationResult.error);
      clearExpiredToken();
      setToken(null);
      setIsAuthenticated(false);
      return;
    }

    setToken(storedToken);
    setIsAuthenticated(true);

    // ユーザーデータ取得。失敗したらログアウト扱い
    getUserdataWithToken(storedToken).catch((error) => {
      console.error("ユーザーデータ取得に失敗:", error);
      clearExpiredToken();
      setToken(null);
      setIsAuthenticated(false);
        });
    } else {
        setToken(null);
        setIsAuthenticated(false);
    }
    }, []);
    // 選択中のコンテンツを変更する
    const handleSelect = (content: string) => {
        setSelectedContent(content);
    };

  // ログイン処理
  const handleLogin = () => {
    const newToken = localStorage.getItem("auth_token");
    if (newToken) {
      setToken(newToken);
      setIsAuthenticated(true);
      getUserdataWithToken(newToken);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setSelectedContent("characterRegist");
        setUser(undefined);
        setToken(null);
        localStorage.removeItem("auth_token");
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました", error);
    }
  };

  // ユーザーデータを取得する処理（指定されたtokenを使用）
  const getUserdataWithToken = async (useToken: string) => {
    try {
      const response = await fetch("/api/user/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("ユーザー情報の取得に失敗しました");
      }
      const responseJson = await response.json();
      const data: User = responseJson.data;
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // 👇 SSRとCSRの差異をなくすため「未判定中はローディングUIを出す」
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-gradient-to-br"
        style={{
          backgroundImage: "url(/image/backgroundFile/Login-bg.PNG)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg w-96 max-h-[90%] overflow-y-auto my-8 scrollbar-hide">
          <Auth onLogin={handleLogin}></Auth>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-full"
      style={{
        backgroundImage: `url(/image/backgroundFile/${selectedContent}.PNG)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="!w-4/5">
        <div className="min-h-full flex justify-center">
          <div className="w-full max-w-10xl rounded-lg p-6 shadow-lg relative">
            <div className="w-15/16 h-9/10 absolute inset-0 m-auto bg-white/50 rounded-lg shadow-lg overflow-auto p-4 scrollbar-hide">
              <Content selectedContent={selectedContent} token={token}></Content>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col w-1/5 bg-umamusume-side bg-cover overflow-hidden bg-white/50">
        <div className="text-white flex flex-col items-center justify-center w-full space-y-4">
          <div
            className="block w-full text-center text-2xl font-bold py-4 rounded-xl border-2 border-gray-300 
                    bg-transparent text-purple-500 transition-all duration-300 hover:bg-pink-200 bg-[30%_30%]
                    hover:text-white hover:scale-105 hover:shadow-lg active:bg-pink-300 mb-4"
            style={{
              backgroundImage: `url(/image/SidebarTab/StillinLove.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="font-bold text-pink text-2xl w-full text-center">
              {user?.user_name}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundImage: `url(/image/SidebarTab/SilenceSuzuka.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`block w-full text-center text-2xl font-bold py-4 rounded-xl border-2 border-gray-300 
                    bg-transparent text-purple-500 transition-all duration-300 hover:bg-pink-200 cursor-pointer
                    hover:text-white hover:scale-105 hover:shadow-lg active:bg-pink-300 mt-4`}
          >
            ログアウト
          </button>
        </div>
        <Sidebar onTabClick={handleSelect}></Sidebar>
      </div>
    </div>
  );
};
