import admin from 'firebase-admin';

const serviceAccount = {
  type: 'service_account',
  project_id: 'duothan3ieee',
  private_key_id: 'f36676c80ce52d48a17ba42e6a6e5659a6d2a239',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCn9XU9fs1WjHDW\nkekm6G/Tx41p08O4766mS7kbyrI7pZpK1CNUMs817fulMM2q0eo965Bk8R2ZOrAK\nU9uoEri2Nq67KUauQB6gIi4mW/u2HHXTZKJKKGsyZlRQPkKk3q3BT0+b1SejBWJC\ngzKm8w1XI6BMaYK5ZLPMlBtfGLiV3y9VVM+UNl3VpHLum3xH54AG23GshtGgZAiu\nbqShAUmKtu1+WFCDtfKBWMnWZQ3Vo8wpPyPgZBEBFo3P/5n62/9kT4lw0AaBkJjH\nxKiove6qp80UzA4XaaeNVYWhgE3TkLB1kmUPkqlImefeTs9gdK8uyRTbuKtp9e1g\nis+067KXAgMBAAECggEANT9bKODPZnXlvBDMEtqzwTdNfNR3A2VxQCVXjRkIwmIw\n9TIl9SaajKVjFy7OtS4RjgnlYCsU0CRL9So6xCETUCkr4ggm8U1AqFHNwbl9pnGF\nZTxNOydvPK42Yq4qYKx794IWYfgEtekaCq4fW9BIVWzk//SfTflAC0aVGuPyeQii\nIEZP45h4qs6udG8ajKzDkQMHlGp0QI7AqJS0zHiZeQOjsBjUfNe5jpXusIuEcn55\nEAFUKtC2lSDaZwKHsv71pYbwzWHwmjK1BpfsqO9XIprt8ISgV4SKPVjXZSLZZPsu\n0tC4dQZoKhTj3gYZqBcqDPNzA2xsoI4lQd75xUhc+QKBgQDW2gNoKJuCX84yAfzT\niPQxLfKOVBKdeeopefOvpVcJyjuaMiXFpdHYR21cIoKXshrhssq2YNDjrLgu9Tjk\n1NP8nmK9Fiz1fnwQAS5gaUHyhMJKJRY+nSne7UIWQdSeZXQbyzrq3jYtsF5/QkkP\nQMxLEwoi7urIzjEdiPDXukJvnQKBgQDIIFT8yvSEKQvSzqjl/E6FDTGs1J2LuuYJ\nvxQLbimBGLnC26w7nr3dTksGtxkR1LETldtlFMNMml98N82P1UgWCaXluDud6rq+\n/4ZC6iJx8MQmpOmvV33/PBmJi2I4E1un7HOBRLUYahNjvlzEftFIpIsVxPB7mj5m\npICHkY8GwwKBgDraPVSqyu5LkA/iu362ZS2TiH20SeUZICt8XGQgxlbILstuMSqS\n4Yh9CFfUnDExeGuariyHGLFE/q7ePVdxdSAdwq5JBMe6fgFkUW/XZVkpRI9K2W0N\nYArQsuml3rgE0mlKojjz5aNeTIRPg/PJrCxkasJm76lR0eJlQJPXUZuBAoGAOYfR\n5roRgMyr8XYnZ7YYfHdGiIC2qayY5MRhZsfMdqg8/p9X6+u+eRhAyTVpp46VOSQj\nZfOKEUNvn64LEgYmKu+rGVbVDJimBrI+To4wSMEGInXWF+n29qC4VqoTGju2ZZe7\nvLWbueEEoe/fiz1JvLBQq3lqCJ5WwfsYV+CoVTECgYBOb6RZ6j5muD3/J15FJnRk\nn+4b3M88ypXIPi3bQx7MSAIOw+E7f5OcN6RUzholvDjOKA0hRhKCpfYHmrggSSCr\nZzHm44wlD4cyR1UU+iDwYY66ePbkHWHX/v9Od7wWsM0A9riH3Xtu/KC4qxgKmVNL\n6BVbDCZVkdrtbAzDDz+FSg==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-doj73@duothan3ieee.iam.gserviceaccount.com',
  client_id: '116409971445993296785',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-doj73%40duothan3ieee.iam.gserviceaccount.com',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'duothan3ieee.appspot.com',
});

const bucket = admin.storage().bucket();

const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const image = req.file;
  const name = Date.now() + '---' + image.originalname;
  const file = bucket.file(name);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on('error', (err) => {
    next(err);
  });

  stream.on('finish', async () => {
    console.log('finish');
    await file.makePublic();
    req.file = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    next();
  });

  stream.end(image.buffer);
};

const uploadFiles = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const files = req.files;
  const urls = [];

  for (let file of files) {
    const name = Date.now() + '---' + file.originalname;
    const bucketFile = bucket.file(name);

    const stream = bucketFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => {
      next(err);
    });

    stream.on('finish', async () => {
      console.log('finish');
      await bucketFile.makePublic();
      urls.push(
        `https://storage.googleapis.com/${bucket.name}/${bucketFile.name}`
      );
      if (urls.length === files.length) {
        req.files = urls;
        next();
      }
    });

    stream.end(file.buffer);
  }
};

const deleteImage = async (imageUrl) => {
  try {
    const name = imageUrl.split('/').pop();
    const file = bucket.file(name);
    await file.delete();
  } catch (error) {}
};

const deleteFiles = async (fileUrl) => {
  try {
    const name = fileUrl.split('/').pop();
    const bucketFile = bucket.file(name);
    await bucketFile.delete();
  } catch (error) {}
};

export { uploadImage, deleteImage, uploadFiles, deleteFiles };
