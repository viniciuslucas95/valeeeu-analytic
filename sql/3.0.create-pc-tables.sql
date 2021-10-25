CREATE TABLE pc_cpu(
    id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_pc_cpu_id
		UNIQUE(id),
	CONSTRAINT pk_pc_cpu
		PRIMARY KEY(id),
    usage_percentage DECIMAL
        NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE pc_memory(
    id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_pc_memory_id
		UNIQUE(id),
	CONSTRAINT pk_pc_memory
		PRIMARY KEY(id),
    total DECIMAL
        NOT NULL,
    free DECIMAL
        NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE pc_process(
    id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_pc_process_id
		UNIQUE(id),
	CONSTRAINT pk_pc_process
		PRIMARY KEY(id),
    processes JSON
		NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE pc_disk(
    id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_pc_disk_id
		UNIQUE(id),
	CONSTRAINT pk_pc_disk
		PRIMARY KEY(id),
    disks JSON
		NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);