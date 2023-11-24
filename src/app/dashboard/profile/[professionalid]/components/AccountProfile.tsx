'use client'
import * as React from 'react'
import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import Button from '@/components/Button';
import { useEdgeStore } from '@/lib/edgestore';
import Link from 'next/link';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

interface ProfessionalInfoProps {
  name: string;
  city: string;
  uf: string;
  telefone: string;
  id_prestador: string;
  url_foto: string;
};

const AccountProfile = ({ name, city, uf, telefone, id_prestador, url_foto }: ProfessionalInfoProps) => {

  const [file, setFile] = React.useState<File>();
  const [urls, setUrls] = React.useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const { edgestore } = useEdgeStore();

  const myRef = React.useRef(null);

  const clickElement = (ref: any) => {
    ref.current.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }),
    );
  };

  return (
    <Card className='bg-white dark:bg-darkBGLighter text-black dark:text-white rounded-lg p-4'>
      <CardContent>

        <div>
          <input className='hidden' id='fileInput' type="file" ref={myRef} onChange={(e) => {
            setFile(e.target.files?.[0]);
          }} />

          {/* <button onClick={async () => {
            console.log(file)
            if (file) {
              const res = await edgestore.myPublicImages.upload({ file })

              const response = await fetch("http://localhost:3000/uploadFile", {
                method: "POST",
                body: Buffer.from(
                  JSON.stringify({
                    url: res.thumbnailUrl,
                  })
                ),
              });

              setUrls({
                url: res.url,
                thumbnailUrl: res.thumbnailUrl,
              })
            }
          }}>
            Upload
          </button>

          {urls?.url && <Link href={urls.url} target='_blank'>URL</Link>}
          {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target='_blank'>Thuuu</Link>} */}
        </div>


        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={url_foto}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5">
            {name}
          </Typography>

          <Typography
            variant="body2">
            {city}, {uf}
          </Typography>

          <Typography
            variant="body2">
            {telefone}
          </Typography>
        </Box>

      </CardContent>

      <Divider />

      <Button variant="primary" className='w-full mt-4 py-3' onClick={() => clickElement(myRef)}>
        Atualizar foto
      </Button>

      {file &&
        <Button variant="primary"
          className='w-full mt-4 py-3'
          onClick={async () => {
            console.log(file)
            if (file) {
              const res = await edgestore.myPublicImages.upload({ file })

                const responseFetch = await fetch(`/existeFoto/${id_prestador}`);

                const json = await responseFetch.json();

                if (json.length > 0) {
                  const responsePut = await fetch("http://localhost:3000/updateFile", {
                    method: "PUT",
                    body: Buffer.from(
                      JSON.stringify({
                        id_prestador: id_prestador,
                        url_foto: res.thumbnailUrl,
                      })
                    ),
                  });

                } else {
                  const responsePost = await fetch("http://localhost:3000/uploadFile", {
                    method: "POST",
                    body: Buffer.from(
                      JSON.stringify({
                        id_prestador: id_prestador,
                        url: res.thumbnailUrl,
                      })
                    ),
                  });
                }

              setUrls({
                url: res.url,
                thumbnailUrl: res.thumbnailUrl,
              })
            }

            toast.success("Foto alterada com sucesso!", { position: "top-right" });
          }}>
          Salvar nova foto
        </Button>}

    </Card>
  );
};

export default AccountProfile;