import { EventEmitter } from 'events';
import { Promise } from 'q';

interface ExecOptions {
  buffered: boolean;
  cwd: string;
}

interface ExecutionResult {
  code: number;
  output: string;
}

interface AbstractAnsibleCommand<T extends AbstractAnsibleCommand<T>> extends EventEmitter {

  exec(options: ExecOptions): Promise<ExecutionResult>;

  forks(numberOfForks: number): T;
  verbose(verbosity: string): T;
  user(user: string): T;
  inventory(inventory: string): T;
  privateKey(privateKey: string): T;
  limit(limit: string): T;
  su(su: string): T;
  sudo(): T;

}

export interface AdHoc extends AbstractAnsibleCommand<AdHoc> {

  module(module: string): AdHoc;
  args(args: any, freeform: any): AdHoc;
  hosts(hosts: string): AdHoc;
  validate(): string[];

}

export interface Playbook extends AbstractAnsibleCommand<Playbook> {

  askPass(): Playbook;
  askSudoPass(): Playbook;
  playbook(playbook: string): Playbook;
  variables(variables: any): Playbook;

}
