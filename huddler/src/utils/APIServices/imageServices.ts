

export const getUploadUrl = async () => {

  return await fetch('https://w878gqgb63.execute-api.eu-west-1.amazonaws.com/test/getPresignedUrl-test', {
    method: 'GET',
    mode: 'cors',
    // headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((uploadURL) => {return uploadURL})
    .catch((err) => console.log(err));

};
// Return: upload Url and filename 


export const uploadImgToS3 = async (uploadUrlForS3: string, file: any) => {

  return await fetch(uploadUrlForS3, {
    method: 'PUT',
    mode: 'cors',
    body: file
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

};
