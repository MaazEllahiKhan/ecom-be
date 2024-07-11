import { MigrationInterface, QueryRunner } from "typeorm";

export class FiveAdminAddition1720617552053 implements MigrationInterface {
    name = 'FiveAdminAddition1720617552053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`admin_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`twoFA_Key\` varchar(255) NOT NULL, \`is2faEnabled\` tinyint NOT NULL DEFAULT 0, \`is_blocked\` tinyint NOT NULL DEFAULT 0, \`status\` varchar(255) NOT NULL DEFAULT '', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`admin_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`DROP INDEX \`REL_145532db85752b29c57d2b7b1f\` ON \`order_items\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP INDEX \`IDX_145532db85752b29c57d2b7b1f\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
