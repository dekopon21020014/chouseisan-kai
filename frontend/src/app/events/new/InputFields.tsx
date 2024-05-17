import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import {FormValuesType} from "./FormValuesType";

export function NameField(props: {
    register: UseFormRegister<FormValuesType>;
}) {
    return(
        <TextField
            label="お名前"
            variant="filled"
            helperText=' '
            {...props.register('name')}
        />
    )
};

export function EmailField(props: {
    register: UseFormRegister<FormValuesType>;
    errorMessage?: string;
}) {

    return (
        <TextField
            label="メールアドレス（必須）"
            type='email'
            variant="filled"
            error={props.errorMessage !== undefined}
            helperText={props.errorMessage || ' '}
            {...props.register('email', {
                required: 'メールアドレスを入力してください',
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "無効なメールアドレスです",
                }
            })}
        />
    );
};

export function MessageField(props: {
    register: UseFormRegister<FormValuesType>;
    errorMessage?: string;
}) {
    return (
        <TextField
            multiline
            rows={6}
            label="お問い合わせ内容（必須）"
            variant="filled"
            error={props.errorMessage !== undefined}
            helperText={props.errorMessage || ' '}
            {...props.register('message', { required: 'お問い合わせ内容を入力してください' })}
        />
    );
};