import { useRouter } from "next/navigation";
import { useState } from "react";
import {FormValuesType} from "./FormValuesType";

export const useContactForm = () => {

    const [hasError, setHasError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const closeError = () => setHasError(false);    
    
    const sendData = async (data: FormValuesType) => {
        console.log(data);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/events', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error();

            router.push('/events/new');

        } catch {
            setHasError(true);
        }

       setIsLoading(false);
   };

   return { hasError, isLoading, sendData, closeError };
};
