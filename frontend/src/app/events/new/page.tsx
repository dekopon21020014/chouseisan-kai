'use client';
import {ContactForm}    from "./Form";
import {useContactForm} from "./ContactForm";
import {ErrorSnackbar}  from "./ErrorSnackbar";

export default function Page() {

   const { hasError, isLoading, sendData, closeError } = useContactForm();

   return (
        <div style={{ //要素を中央寄せ 
            textAlign: 'center',
            padding: 'auto',
        }}>

        <h1 style={{ fontSize: '2em', margin: '20px 0' }}>新しいイベント</h1>

        <ContactForm onSubmit={sendData} isLoading={isLoading} />

        <ErrorSnackbar hasError={hasError} closeError={closeError} />

       </div>
   );
};

