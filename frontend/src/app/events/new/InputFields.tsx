import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { Controller, useForm } from 'react-hook-form';

import {FormValuesType} from "./FormValuesType";

export function NameField(props: {
    register: UseFormRegister<FormValuesType>;
    errorMessage?: string;
}) {
    return(
        <TextField
            label="イベント名(必須)"
            variant="filled"
            helperText=' '
            error={props.errorMessage !== undefined}
            {...props.register('name', { required: 'イベント名を記述してください' })}
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

export function DescriptionField(props: {
    register: UseFormRegister<FormValuesType>;
    errorMessage?: string;
}) {
    return (
        <TextField
            multiline
            rows={6}
            label="イベント説明（必須）"
            variant="filled"
            error={props.errorMessage !== undefined}
            helperText={props.errorMessage || ' '}
            {...props.register('description', { required: 'イベントの内容を記述してください' })}
        />
    );
};


export function OptionsField(props: {
    register: UseFormRegister<FormValuesType>;
    errorMessage?: string;
}) {
    return (
        <TextField
            multiline
            rows={6}
            label="日程候補を改行で区切って入力してください"
            variant="filled"
            error={props.errorMessage !== undefined}
            helperText={props.errorMessage || ' '}
            {...props.register('options', { required: '日程候補を入力してください' })}
        />
    );
};


/*
export function OptionsField(props: {
    register: UseFormRegister<FormValuesType>;
    errorMessage?: string;
}) {
    const { register } = props;
    
    // オプション文字列を変換して登録する
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const optionsString = event.target.value;
        const optionsArray = optionsString.split('\n').map(option => option.trim());
        console.log(optionsArray)
        register('options', { value: optionsArray, required: '日程候補を入力してください' });
    };

    return (
        <TextField
            multiline
            rows={6}
            label="日程候補を改行で区切って入力してください"
            variant="filled"
            error={props.errorMessage !== undefined}
            helperText={props.errorMessage || ' '}
            onChange={handleChange} // 変更ハンドラを追加
        />
    );
};

*/




/*
const OptionsField: NextPage = () => {
    const { control, handleSubmit } = useForm<InputType>({
      resolver: yupResolver(schema),
    });
    const onSubmit = (data: InputType): void => console.log(data.word);
  
    const parseArray = (e: ChangeEvent<HTMLTextAreaElement>): string[] => {
      return e.target.value.split('\n');
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={'word'}
          defaultValue={[]}
          render={({ field: { onChange, value } }): JSX.Element => (
            <textarea
              placeholder={'word1\nword2\nword3'}
              rows={5}
              onChange={(e): void => onChange(parseArray(e))}
              value={value?.join('\n')}
            />
          )}
        />
        <input type="submit" />
      </form>
    );
  };
  
  export default OptionsField;
  */