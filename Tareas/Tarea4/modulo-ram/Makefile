obj-m += ram_202003926.o

all:
	make -C /lib/modules/5.19.0-42-generic/build M=$(PWD) modules

clean:
	make -C /lib/modules/5.19.0-42-generic/build M=$(PWD) clean
