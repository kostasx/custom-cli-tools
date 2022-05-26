module.exports = function hookCreator (fetcher) {
  const importsLine = `import { useMemo } from "react";\nimport useApiResult from "./useApiResult";\nimport { ${fetcher} } from "../endpoints";\n`;

  const hook = `export default function use${String(fetcher[0].toUpperCase() + fetcher.slice(1))} () {
  const request = useMemo(() => ${fetcher}(), []);
  return useApiResult(request);
}`

  return `${importsLine}\n${hook}`;
};

/* EXPECTED RESULT:

import { useState, useEffect, useMemo } from "react";
import useApiResult from "./useApiResult";
import { getTodos } from "./requests";

export default function useTodos () {
	const request = useMemo(() => getTodos(), []); // stable identity
	return useApiResult(request);
}

*/