#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/mm.h>  // Incluir linux/mm.h
#include <asm/uaccess.h>
#include <linux/seq_file.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("TAREA 4 SO1");
MODULE_AUTHOR("Daniel Minchez");

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct sysinfo si;

    // Obtener estadísticas de memoria
    si_meminfo(&si);

    // Calcular el porcentaje de RAM en uso
    unsigned long total_ram = si.totalram * PAGE_SIZE;
    unsigned long ram_libre = si.freeram * PAGE_SIZE;
    unsigned long ram_en_uso = total_ram - ram_libre;
    int porcentaje_en_uso = ram_en_uso / total_ram * 100;

    // Escribir la información en formato JSON
    seq_printf(archivo, "{\n");
    seq_printf(archivo, "  \"total_ram\": %lu,\n", total_ram);
    seq_printf(archivo, "  \"ram_en_uso\": %lu,\n", ram_en_uso);
    seq_printf(archivo, "  \"ram_libre\": %lu,\n", ram_libre);
    seq_printf(archivo, "  \"porcentaje_en_uso\": %u\n", porcentaje_en_uso);

    seq_printf(archivo, "}\n");

    return 0;
}


//Funcion que se ejecuta cuando se le hace un cat al modulo.
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

// Si el su Kernel es 5.6 o mayor
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void)
{
    proc_create("ram_202003926", 0, NULL, &operaciones);
    printk(KERN_INFO "202003926\n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("ram_202003926", NULL);
    printk(KERN_INFO "Josue Daniel Minchez Velasquez\n");
}

module_init(_insert);
module_exit(_remove);