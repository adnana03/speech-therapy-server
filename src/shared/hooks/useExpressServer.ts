import express, { Express, Request, Response, Application } from "express";

interface ServerAction {
  method: string;
  path: string;
  handler: (req: Request, res: Response) => void;
}

type ActionsMap = Record<string, (req: Request, res: Response) => void>;

const useExpressServer = (
  port: number,
  actions: ServerAction[]
): Application => {
  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const actionsMap: ActionsMap = {};

  actions.forEach((action) => {
    actionsMap[action.method] = action.handler;
  });

  Object.entries(actionsMap).forEach(([method, handler]) => {
    app[method as keyof Express](handler);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  return app;
};

export default useExpressServer;
