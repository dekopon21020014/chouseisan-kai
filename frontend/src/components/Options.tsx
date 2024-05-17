"use client"
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  selectedImageUrl: string;
};

const Options = () => {
  const imageUrls = [
    '/check.png',
    '/cannot.jpeg',
    '/class.png',
    '/ta.png'
  ];

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      selectedImageUrl: imageUrls[0]
    }
  });

  const selectedImageUrl = watch("selectedImageUrl");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("selectedImageUrl", e.target.value);
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={{ height: 1 }}>
        <RadioGroup
          value={selectedImageUrl}
          onChange={handleChange}
          sx={{ height: 1 }}
        >
          <ImageList
            variant='woven'
            cols={4}
            gap={8}
          >
            {imageUrls.map((imageUrl, i) => (
              <Radio
                key={i}
                value={imageUrl}
                {...register('selectedImageUrl')}
                icon={
                  <ImageListItem>
                    <img
                      src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading='lazy'
                    />
                  </ImageListItem>
                }
                checkedIcon={
                  <ImageListItem sx={{ border: 4 }}>
                    <img
                      src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading='lazy'
                    />
                  </ImageListItem>
                }
              />
            ))}
          </ImageList>
        </RadioGroup>
        <button type="submit">Submit</button>
      </FormControl>
    </form>
  );
};

export default Options;
