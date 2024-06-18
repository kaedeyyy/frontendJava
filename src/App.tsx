//import { useState } from 'react';
import './App.css';
import {TextField,Button} from '@mui/material';
import { useForm } from "react-hook-form";
import { passwordCheck } from "./module.tsx";
import { signupUser } from "./api.tsx";


function App() {

  type formInput = {userName: string; password: string; passwordRe: string};
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<formInput>()

  //成功時処理
  const onSubmit = (data: formInput) => {
    //パスワードチェック
    if(passwordCheck(data.password,data.passwordRe)){
      signupUser(data.userName,data.password);
      reset();
    } else {
       setError("passwordRe", {
         type: "manual",
         message: "入力されたパスワードと確認用パスワードが異なります",
       });
    }
    
  };

  //ボタンの表示と非表示
  const isAnyFieldFilled = (): boolean => {

    //入力フィールドの状態を監視
    const userNemeField: String  = watch("userName");
    const passwordField: String   = watch("password");
    const passwordFieldRe: String = watch("passwordRe");

    //入力フィールドがすべてブランクでない場合はボタンを操作可能にする
    if(!(userNemeField) || !(passwordField) || !(passwordFieldRe)) {
      return true;
    } else {
      return false;
    };

  }

  return (
    <>
      <h1>会員登録</h1>
      <form  onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
          margin: "3rem",
        }}>
        <div className = "username">
          <TextField id="username" label="UserName" 
            {...register("userName", { 
              required: "ユーザー名を入力してください",
              pattern: {value:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/, message:"メールの形式ではありません。"} 
            })}
            
          />
          {errors.userName && <p className='errorMsg'>{errors.userName.message}</p>}
        </div>
        <div className = "password">
          <TextField id="password" label="PassWord" type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p className='errorMsg'>パスワードを入力してください</p>}
        </div>

        <div className = "password_re">
          <TextField id="password_re" label="PassWordの確認" type="password" 
            {...register("passwordRe", { required: '確認用パスワードを入力してください'})}
          />
          {errors.passwordRe && <p className='errorMsg'>{errors.passwordRe.message}</p>}
        </div>
        
        <Button 
          variant="contained" 
          type="submit"
          disabled =  {isAnyFieldFilled()}

        >登録</Button>

      </form>
    </>
  );
}

export default App;
