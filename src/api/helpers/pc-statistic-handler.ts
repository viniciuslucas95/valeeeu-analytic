import { exec } from 'child_process';
import { promisify } from 'util';

interface IMemoryStatistic {
  total: number;
  free: number;
}

interface ICpuStatistic {
  usagePercentage: number;
}

interface IProcessStatistic {
  name: string;
  cpuUsagePercentage: number;
  memoryUsagePercentage: number;
}

interface IDiskStatistic {
  filesystem: string;
  total: number;
  free: number;
  mountedOn: string;
}

interface IPcStatistics {
  cpu: ICpuStatistic;
  memory: IMemoryStatistic;
  processes: IProcessStatistic[];
  disks: IDiskStatistic[];
}

const execAsync = promisify(exec);

export class PcStatisticHandler {
  static async getPcStatisticsAsync(): Promise<IPcStatistics> {
    const { stdout: stdoutProcesses } = await execAsync('top -b -n 1');
    const processRows = stdoutProcesses.split('\n');
    const memoryRow = processRows[3];
    const cpuRow = processRows[2];
    const processes: IProcessStatistic[] = [];
    for (let i = 7; i < processRows.length - 1; i++) {
      const process = this.formatProcessRow(processRows[i]);
      processes.push(process);
    }
    const cpuStatistics = this.formatCpuRow(cpuRow);
    const memoryStatistics = this.formatMemoryRow(memoryRow);
    const { stdout: stdoutDisks } = await execAsync('df -h');
    const diskRows = stdoutDisks.split('\n');
    const disks: IDiskStatistic[] = [];
    for (let i = 1; i < diskRows.length - 1; i++) {
      const disk = this.formatDiskRow(diskRows[i]);
      disks.push(disk);
    }
    return {
      cpu: cpuStatistics,
      memory: memoryStatistics,
      processes,
      disks,
    };
  }

  private static formatCpuRow(row: string): ICpuStatistic {
    return {
      usagePercentage: parseFloat(
        (100 - parseFloat(row.split(', ')[3].replace(/\sid/gm, ''))).toFixed(2)
      ),
    };
  }

  private static formatMemoryRow(row: string): IMemoryStatistic {
    const columns = row.split(':  ')[1].split(', ');
    const totalColumn = columns[0];
    const freeColumn = columns[1];
    const total = parseFloat(totalColumn.replace(' total', ''));
    const free = parseFloat(freeColumn.replace(' ', '').replace('free', ''));
    return {
      total,
      free,
    };
  }

  private static formatProcessRow(row: string): IProcessStatistic {
    const columns = row.replace(/(\s+)/gm, '-').split('-');
    const cpuUsagePercentage = parseFloat(columns[9]);
    const memoryUsagePercentage = parseFloat(columns[10]);
    const name = columns[12];
    return {
      name,
      cpuUsagePercentage,
      memoryUsagePercentage,
    };
  }

  private static formatDiskRow(row: string): IDiskStatistic {
    const columns = row.replace(/(\s+)/gm, '-').split('-');
    const filesystem = columns[0];
    const total = parseFloat(columns[1].replace('G', '000'));
    const free = parseFloat(columns[3].replace('G', '000'));
    const mountedOn = columns[5];
    return {
      filesystem,
      total,
      free,
      mountedOn,
    };
  }
}
