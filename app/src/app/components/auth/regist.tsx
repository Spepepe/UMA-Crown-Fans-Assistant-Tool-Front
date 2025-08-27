import { useState } from "react";
import { InputField } from '../common/inputField';
import { RegistProps } from '../interface/props';

//ユーザー情報を登録する画面
export const Regist :React.FC<RegistProps> = ({onReturn,onRegist}) => {
    
    // ユーザーの名前
    const [ userName, setUserName ] = useState("");

    // パスワード
    const [ password, setPassword ] = useState("");

    // Eメールアドレス
    const [ email, setEmail ] = useState("");

    //親画面に画面の終了を通知する
    const handleReturn = () =>{
        onReturn();
    } 

    //ユーザー情報をサーバー側へ送信する
    const handleRegist = async ()  => {
        if (userName && password) {
        try {
                const response = await fetch("/api/user/register/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_name: userName,
                        password: password,
                        email: email
                    }),
                });

                if (!response.ok) {
                    throw new Error("ユーザーの登録に失敗しました");
                }
                const data = await response.json();
                onRegist(userName, password);
                alert("登録が完了しました！");
                } catch (error) {
                    console.error("Error during registration:", error);
                    alert("エラーが発生しました。");
            }
        } else {
            alert("ユーザーIDとパスワードを入力してください。");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">新規登録</h2>
            <div className="p-4">
            <InputField
                id="userName"
                label="ユーザー名"
                type="text"
                value={userName}
                placeholder="ユーザー名を入力してください"
                onChange={(e) => setUserName(e.target.value)}/>
            <InputField
                id="email"
                label="メールアドレス"
                type="email"
                value={email}
                placeholder="メールアドレスを入力してください"
                onChange={(e) => setEmail(e.target.value)}/>
            <InputField
                id="password"
                label="パスワード"
                type="password"
                value={password}
                placeholder="パスワードを入力してください"
                onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button
                className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
                onClick={handleRegist}>
                新規登録
            </button>
            <button
                className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none mt-8"
                onClick={handleReturn}>
                戻る
            </button>
        </div>
    );
};