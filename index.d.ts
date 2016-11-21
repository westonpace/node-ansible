import { EventEmitter } from 'events';
import * as Promise from 'bluebird';

interface ExecOptions {
  buffered: boolean;
  cwd: string;
}

interface ExecutionResult {
  code: number;
  output: string;
}

declare abstract class AbstractAnsibleCommand<T extends AbstractAnsibleCommand<T>> extends EventEmitter {

  exec(options?: ExecOptions): Promise<ExecutionResult>;

  forks(numberOfForks: number): T;
  verbose(verbosity: string): T;
  user(user: string): T;
  inventory(inventory: string): T;
  privateKey(privateKey: string): T;
  limit(limit: string): T;
  su(su: string): T;
  sudo(): T;

}

export class AdHoc extends AbstractAnsibleCommand<AdHoc> {

  constructor();

  module(module: string): AdHoc;
  args(args: any, freeform: any): AdHoc;
  hosts(hosts: string): AdHoc;
  validate(): string[];

}

export class Playbook extends AbstractAnsibleCommand<Playbook> {

  constructor();

  askPass(): Playbook;
  askSudoPass(): Playbook;
  playbook(playbook: string): Playbook;
  variables(variables: any): Playbook;

}
