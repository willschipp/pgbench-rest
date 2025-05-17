import { MockHandler } from 'vite-plugin-mock-server'

const mocks: MockHandler[] = [
    {
        pattern: '/api/setup',
        method: 'POST',
        handle: (req,res) => {
            res.statusCode = 200            
            res.end(JSON.stringify({
                "result": [
                    "dropping old tables...",
                    "creating tables...",
                    "generating data...",
                    "100000 of 5000000 tuples (2%) done (elapsed 0.03 s, remaining 1.38 s)",
                    "200000 of 5000000 tuples (4%) done (elapsed 0.06 s, remaining 1.33 s)",
                    "300000 of 5000000 tuples (6%) done (elapsed 0.08 s, remaining 1.22 s)",
                    "400000 of 5000000 tuples (8%) done (elapsed 0.10 s, remaining 1.17 s)",
                    "500000 of 5000000 tuples (10%) done (elapsed 0.12 s, remaining 1.12 s)",
                    "600000 of 5000000 tuples (12%) done (elapsed 0.16 s, remaining 1.18 s)",
                    "700000 of 5000000 tuples (14%) done (elapsed 0.19 s, remaining 1.19 s)",
                    "800000 of 5000000 tuples (16%) done (elapsed 0.22 s, remaining 1.14 s)",
                    "900000 of 5000000 tuples (18%) done (elapsed 0.57 s, remaining 2.62 s)",
                    "1000000 of 5000000 tuples (20%) done (elapsed 0.85 s, remaining 3.38 s)",
                    "1100000 of 5000000 tuples (22%) done (elapsed 1.10 s, remaining 3.90 s)",
                    "1200000 of 5000000 tuples (24%) done (elapsed 1.21 s, remaining 3.82 s)",
                    "1300000 of 5000000 tuples (26%) done (elapsed 1.45 s, remaining 4.14 s)",
                    "1400000 of 5000000 tuples (28%) done (elapsed 1.67 s, remaining 4.30 s)",
                    "1500000 of 5000000 tuples (30%) done (elapsed 1.83 s, remaining 4.28 s)",
                    "1600000 of 5000000 tuples (32%) done (elapsed 2.13 s, remaining 4.52 s)",
                    "1700000 of 5000000 tuples (34%) done (elapsed 2.35 s, remaining 4.56 s)",
                    "1800000 of 5000000 tuples (36%) done (elapsed 2.46 s, remaining 4.38 s)",
                    "1900000 of 5000000 tuples (38%) done (elapsed 2.67 s, remaining 4.36 s)",
                    "2000000 of 5000000 tuples (40%) done (elapsed 2.78 s, remaining 4.17 s)",
                    "2100000 of 5000000 tuples (42%) done (elapsed 3.03 s, remaining 4.19 s)",
                    "2200000 of 5000000 tuples (44%) done (elapsed 3.29 s, remaining 4.19 s)",
                    "2300000 of 5000000 tuples (46%) done (elapsed 3.42 s, remaining 4.01 s)",
                    "2400000 of 5000000 tuples (48%) done (elapsed 3.69 s, remaining 4.00 s)",
                    "2500000 of 5000000 tuples (50%) done (elapsed 3.78 s, remaining 3.78 s)",
                    "2600000 of 5000000 tuples (52%) done (elapsed 4.01 s, remaining 3.70 s)",
                    "2700000 of 5000000 tuples (54%) done (elapsed 4.23 s, remaining 3.60 s)",
                    "2800000 of 5000000 tuples (56%) done (elapsed 4.40 s, remaining 3.45 s)",
                    "2900000 of 5000000 tuples (58%) done (elapsed 4.83 s, remaining 3.50 s)",
                    "3000000 of 5000000 tuples (60%) done (elapsed 5.00 s, remaining 3.34 s)",
                    "3100000 of 5000000 tuples (62%) done (elapsed 5.29 s, remaining 3.24 s)",
                    "3200000 of 5000000 tuples (64%) done (elapsed 5.33 s, remaining 3.00 s)",
                    "3300000 of 5000000 tuples (66%) done (elapsed 5.96 s, remaining 3.07 s)",
                    "3400000 of 5000000 tuples (68%) done (elapsed 6.19 s, remaining 2.91 s)",
                    "3500000 of 5000000 tuples (70%) done (elapsed 6.50 s, remaining 2.79 s)",
                    "3600000 of 5000000 tuples (72%) done (elapsed 6.72 s, remaining 2.62 s)",
                    "3700000 of 5000000 tuples (74%) done (elapsed 6.82 s, remaining 2.40 s)",
                    "3800000 of 5000000 tuples (76%) done (elapsed 7.06 s, remaining 2.23 s)",
                    "3900000 of 5000000 tuples (78%) done (elapsed 7.14 s, remaining 2.01 s)",
                    "4000000 of 5000000 tuples (80%) done (elapsed 9.98 s, remaining 2.49 s)",
                    "4100000 of 5000000 tuples (82%) done (elapsed 10.37 s, remaining 2.28 s)",
                    "4200000 of 5000000 tuples (84%) done (elapsed 10.42 s, remaining 1.98 s)",
                    "4300000 of 5000000 tuples (86%) done (elapsed 10.76 s, remaining 1.75 s)",
                    "4400000 of 5000000 tuples (88%) done (elapsed 11.06 s, remaining 1.51 s)",
                    "4500000 of 5000000 tuples (90%) done (elapsed 11.30 s, remaining 1.26 s)",
                    "4600000 of 5000000 tuples (92%) done (elapsed 12.79 s, remaining 1.11 s)",
                    "4700000 of 5000000 tuples (94%) done (elapsed 12.88 s, remaining 0.82 s)",
                    "4800000 of 5000000 tuples (96%) done (elapsed 15.83 s, remaining 0.66 s)",
                    "4900000 of 5000000 tuples (98%) done (elapsed 16.09 s, remaining 0.33 s)",
                    "5000000 of 5000000 tuples (100%) done (elapsed 16.38 s, remaining 0.00 s)",
                    "vacuuming...",
                    "creating primary keys...",
                    "done.",
                    ""
                ],
                "timeTaken": 35.963474356000006
            }));
        }
    },
    {
        pattern: '/api/execute',
        method: 'POST',
        handle: (req,res) => {
            res.statusCode = 200            
            res.end(JSON.stringify({
                "result": [
                    "starting vacuum...end.",
                    "transaction type: <builtin: TPC-B (sort of)>",
                    "scaling factor: 5",
                    "query mode: simple",
                    "number of clients: 2",
                    "number of threads: 2",
                    "number of transactions per client: 100",
                    "number of transactions actually processed: 200/200",
                    "latency average = 5.722 ms",
                    "tps = 349.528460 (including connections establishing)",
                    "tps = 356.863629 (excluding connections establishing)"
                ],
                "timeTaken": 0.6456905480008572
            }));
        }
    },
    {
        pattern: '/api/results',
        method: 'GET',
        handle: (req,res) => {
            res.statusCode = 200,
            res.end(JSON.stringify([
                {
                    "result": [
                        "starting vacuum...end.",
                        "transaction type: <builtin: TPC-B (sort of)>",
                        "scaling factor: 5",
                        "query mode: simple",
                        "number of clients: 2",
                        "number of threads: 2",
                        "number of transactions per client: 100",
                        "number of transactions actually processed: 200/200",
                        "latency average = 4.310 ms",
                        "tps = 464.004621 (including connections establishing)",
                        "tps = 482.770159 (excluding connections establishing)"
                    ],
                    "timeTaken": 0.5039268040000024,
                    "timestamp": "2025-05-17T16:48:42.476405"
                }
            ]));
        }
    }    
]

export default mocks