import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


export const writeTestFile = async () => {
  try {
    await Filesystem.mkdir({
      path: 'campManager/',
      directory: Directory.Documents,
      recursive: true
    })
  } catch {
    const directory = await Filesystem.readdir({
      path: 'campManager/',
      directory: Directory.Documents
    })
    console.log(directory)
    console.log(Directory.Documents)
  }
  await Filesystem.writeFile({
    path: 'campManager/text.txt',
    data: "This is a test",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};
