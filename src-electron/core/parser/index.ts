import {Parser, ParserTask, Repository} from "app/src-electron/type";
import {ParsingTask} from "app/type";
import {publishTaskStatus} from "app/src-electron/ipc/main-to-renderer";
import {configuration} from "app/src-electron/config/config";

export abstract class AbstractParser<T> implements Parser<T> {

  protected repository: Repository<T>;

  async parse(task: ParserTask): Promise<T[]> {
    const start = Date.now();
    try {
      const result: T[] = await this.execute(task);

      this.publishTaskStatusEvent({
        id: task.id,
        parsing: true,
        parsingResult: result,
        parsingSpentTimeInMillis: Date.now() - start,
      });
      // 저장
      // no await
      if (this.repository) {
        this.repository.save(result);
      }

      return result;
    } catch(e) {
      console.error(e);
      this.publishTaskStatusEvent({
        id: task.id,
        parsing: false,
        parsingError: e as Error,
        parsingSpentTimeInMillis: Date.now() - start,
      });

      return [];
    }
  }

  abstract execute(task: ParserTask): Promise<T[]>;

  private publishTaskStatusEvent(parsingTask: ParsingTask) {
    if (configuration.useTaskStatusEvent) {
      publishTaskStatus(parsingTask);
    }
  }


}
