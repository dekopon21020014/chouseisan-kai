'use client';

import { Stack, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { NameField, EmailField, DescriptionField } from './InputFields';
import {FormValuesType} from "./FormValuesType";

export function ContactForm(props: {
    onSubmit: (formValues: FormValuesType) => void;
    isLoading: boolean;
}) {

    const { handleSubmit, formState: { errors }, register } = useForm<FormValuesType>();

    return (
        <form noValidate onSubmit={handleSubmit(props.onSubmit)}>

            <Stack spacing={2} sx={{ maxWidth: 'sm', margin: 'auto', marginTop: 8 }}>

                <NameField register={register} />

                <EmailField register={register} errorMessage={errors.email?.message} />

                <DescriptionField register={register} errorMessage={errors.description?.message} />

                <Box textAlign='right'>
                    <Button
                        variant="contained"
                        type='submit'
                        disabled={props.isLoading}                        
                    >
                        送信
                    </Button>
                </Box>

            </Stack>

        </form>
    );
};
