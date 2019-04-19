## Use Cases

Below is the list of possible use cases when `which-stream` package could be used.

### Source to Destination

When the `source` and `destination` are passed, a file is be copied as it is.

%EXAMPLE: example/source-destination.js, ../src => which-stream%

%FORK example example/source-destination%

### Source to Writable

When the `source` and `writable` are supplied, a stream pushing input text from the source file will be piped into the given output writable stream.

%EXAMPLE: example/source-writable.js, ../src => which-stream%

%FORK example example/source-writable%

### Source to Stdout

To print a file to `stdout`, the destination should be set to `-` .

%EXAMPLE: example/source-stdout.js, ../src => which-stream%

%FORK example example/source-stdout%

### Readable to Destination

Passing both the `readable` and `destination` properties will ensure that the input stream is written to the destination on the disk.

%EXAMPLE: example/readable-destination.js, ../src => which-stream%

%FORK example example/readable-destination%

### Readable to Destination (Overwriting)

If `readable`'s data initially comes from the same source as the destination to which it will be written, the `source` property must also be set to make sure that the file is overwritten properly. The stream's data will first be buffered in memory, and upon the readable stream's end it will be released to the destination. This is useful when using transform streams which don't necessary read from the source themselves, but are being piped into by another readable.

%EXAMPLE: example/readable-destination-overwrite.js, ../src => which-stream%

%FORK example example/readable-destination-overwrite%

In case the `source` is not passed, the file will become empty.

### Readable to Writable

In the scenario when the `readable` and `writable` are specified, the former will be piped into the latter, and the function's promise will be resolved when the writable finishes.

%EXAMPLE: example/readable-writable.js, ../src => which-stream%

%FORK-markdown example example/readable-writable%

### Readable to Stdout

When a _Readable_ stream needs to be output to the `stdout`, the destination should be set to `-`.

%EXAMPLE: example/readable-stdout, ../src => which-stream%
%FORK-markdown example/readable-stdout%