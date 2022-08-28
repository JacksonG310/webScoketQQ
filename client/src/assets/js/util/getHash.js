import sparkMD5 from "spark-md5";
export const getHash = async(file) => {
    const fileReader = new FileReader();
    const spark = new sparkMD5.ArrayBuffer();
    fileReader.readAsArrayBuffer(file);
    return new Promise((resolve) => {
        fileReader.onload = function(e) {
            const buffer = e.target.result;
            spark.append(buffer);
            const hash = spark.end();
            const suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
            resolve({
                hash,
                filename: `${hash}.${suffix}`
            })
        }
        fileReader.onerror = function() {
            reject();
        }
    })
}