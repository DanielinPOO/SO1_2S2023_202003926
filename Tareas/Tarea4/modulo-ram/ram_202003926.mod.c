#include <linux/module.h>
#define INCLUDE_VERMAGIC
#include <linux/build-salt.h>
#include <linux/elfnote-lto.h>
#include <linux/export-internal.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;
BUILD_LTO_INFO;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(".gnu.linkonce.this_module") = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif


static const struct modversion_info ____versions[]
__used __section("__versions") = {
	{ 0xbdfb6dbb, "__fentry__" },
	{ 0xa6893d39, "single_open" },
	{ 0x5b8239ca, "__x86_return_thunk" },
	{ 0x40c7247c, "si_meminfo" },
	{ 0xe6c49e03, "seq_printf" },
	{ 0xd0da656b, "__stack_chk_fail" },
	{ 0x3f1584d8, "proc_create" },
	{ 0x92997ed8, "_printk" },
	{ 0x5d1d6f6f, "remove_proc_entry" },
	{ 0xd51950b1, "seq_read" },
	{ 0x541a6db8, "module_layout" },
};

MODULE_INFO(depends, "");


MODULE_INFO(srcversion, "FCB75588308343DCD5EA5DB");
