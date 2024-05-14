import fs from "fs";
import { Transform } from "stream";
import { stringify as csvStringify } from "csv-stringify";

const streamHandler = new Transform({
  objectMode: true,
  write(chunk, _encoding, callback) {
    const { name, price, userId } = chunk;

    const row = {
      serviceName: name,
      price,
      userId,
    };
    this.push(row);

    callback();
  },
});

const columns = {
  serviceName: "Service Name",
  price: "Price",
  userId: "User ID",
};

export function getReport(servicesCollection) {
  const outputStream = fs.createWriteStream(`report_${Date.now()}.csv`);

  const cursor = servicesCollection.find({ isAvailable: false });

  const stringifier = csvStringify({ header: true, columns: columns });
  const stream = cursor
    .stream()
    .pipe(streamHandler)
    .pipe(stringifier)
    .pipe(outputStream);

  stream.on("finish", () => {
    console.log("OPERATION SUCCESS 🎉");
  });
}
