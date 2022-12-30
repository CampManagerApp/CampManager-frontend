import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const writeTestFile = async () => {
  try {
    await Filesystem.writeFile({
      path: 'campManager/text.txt',
      data: "This is a test",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    })
  } catch (error) {
    throw { error_write: true }
  }
}

export const exportTableAsCSV = async (organisationName, tableName, tableContent) => {
  const directory = `${organisationName}/tables/`
  try {
    await Filesystem.writeFile({
      path: `${directory}/${tableName}.csv`,
      data: tableContent,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true
    })
  } catch (error) {
      throw { error_write: true }
  }
}
