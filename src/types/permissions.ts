export enum PermissionCodes {
  leadCreate = 'lead.create',
  leadFullRead = 'lead.fullRead',
  leadRead = 'lead.read',
  leadUpdate = 'lead.update',
  leadStatus = 'lead.status',
  leadDelete = 'lead.delete',
  leadManage = 'lead.manage',
  mailSend = 'mail.send',
  companyTypeCreate = 'companyType.create',
  companyTypeRead = 'companyType.read',
  companyTypeUpdate = 'companyType.update',
  companyTypeDelete = 'companyType.delete',
  workspaceCreate = 'workspace.create',
  workspaceRead = 'workspace.read',
  workspaceUpdate = 'workspace.update',
  workspaceDelete = 'workspace.delete',
  workspaceManage = 'workspace.manage',
  usersManage = 'users.manage',
  aclRead = 'acl.read',
  aclManage = 'acl.manage',
}

export const PermissionCodesConvert = {
  'lead.create': PermissionCodes.leadCreate,
  'lead.fullRead': PermissionCodes.leadFullRead,
  'lead.read': PermissionCodes.leadRead,
  'lead.update': PermissionCodes.leadUpdate,
  'lead.status': PermissionCodes.leadStatus,
  'lead.delete': PermissionCodes.leadDelete,
  'lead.manage': PermissionCodes.leadManage,
  'mail.send': PermissionCodes.mailSend,
  'companyType.create': PermissionCodes.companyTypeCreate,
  'companyType.read': PermissionCodes.companyTypeRead,
  'companyType.update': PermissionCodes.companyTypeUpdate,
  'companyType.delete': PermissionCodes.companyTypeDelete,
  'workspace.create': PermissionCodes.workspaceCreate,
  'workspace.read': PermissionCodes.workspaceRead,
  'workspace.update': PermissionCodes.workspaceUpdate,
  'workspace.delete': PermissionCodes.workspaceDelete,
  'workspace.manage': PermissionCodes.workspaceManage,
  'users.manage': PermissionCodes.usersManage,
  'acl.read': PermissionCodes.aclRead,
  'acl.manage': PermissionCodes.aclManage,
}

export function checkPermissions(permissions?: PermissionCodes[], required?: PermissionCodes[]): boolean {
  if(!permissions && !required) return true;

  if(!required || required.length === 0) return true;

  if(!permissions) return false;

  for (const code of required) {
    if (permissions.findIndex(p => p === code) === -1) return false;
  }

  return true;
}